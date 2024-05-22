// Importing Express framework for creating server endpoints
import express from "express";

// Importing functions for interacting with the database
import { createUser, getUserByEmail } from "../models/users";

// Importing helper functions for generating random values and authentication
import { random, authentication } from "../helpers";

// Login endpoint
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body; // Getting email and password from request body

    // Checking if email or password is missing
    if (!email || !password) {
      return res.sendStatus(400); // Bad request status if missing data
    }

    // Retrieving user from database by email
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    // Checking if user exists
    if (!user) {
      return res.sendStatus(400); // Bad request status if user not found
    }

    // Generating hash with provided password and user's salt
    const expectedHash = authentication(user.authentication.salt, password);

    // Comparing generated hash with stored password hash
    if (user.authentication.password !== expectedHash) {
      console.log("Incorrect password"); // Log incorrect password attempt
      return res.status(430).send("Incorrect password"); // Wrong password status
    }

    // Generating new session token
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    // Saving user's session token in the database
    await user.save();

    // Setting session token in a cookie
    res.cookie("ANTONIO-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    console.log("Login successful"); // Log successful login
    // Sending success response with user data
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error); // Logging any errors
    return res.sendStatus(400); // Bad request status if an error occurs
  }
};

// Register endpoint
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body; // Getting email, password, and username from request body

    // Checking if any required data is missing
    if (!email || !password || !username) {
      return res.sendStatus(400); // Bad request status if missing data
    }

    // Checking if user with the same email already exists
    const existingUser = await getUserByEmail(email);

    // If user already exists, return error
    if (existingUser) {
      return res.sendStatus(400); // Bad request status if user already exists
    }

    // Generating salt for password encryption
    const salt = random();

    // Creating new user in the database
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password), // Encrypting password with generated salt
      },
    });

    // Sending success response with newly created user data
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error); // Logging any errors
    return res.sendStatus(400); // Bad request status if an error occurs
  }
};
