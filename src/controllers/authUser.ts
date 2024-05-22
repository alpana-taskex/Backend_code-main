// Importing Express framework for creating server endpoints
import express from "express";

// Importing functions for interacting with the database
import { deleteUserById, getUser, getUserById } from "../models/users";

// Endpoint to get all users
export const getAllUsers = async (
  req: express.Request, // Request object parameter with TypeScript type annotation
  res: express.Response // Response object parameter with TypeScript type annotation
) => {
  try {
    const users = await getUser(); // Fetching all users from the database

    return res.status(200).json(users); // Sending a success response with all users in JSON format
  } catch (error) {
    console.log(error); // Logging any errors
    return res.sendStatus(400); // Sending a bad request status if an error occurs
  }
};

// Endpoint to delete a user by ID
export const deleteUser = async (
  req: express.Request, // Request object parameter with TypeScript type annotation
  res: express.Response // Response object parameter with TypeScript type annotation
) => {
  try {
    const { id } = req.params; // Extracting user ID from request parameters

    const deleteUser = await deleteUserById(id); // Deleting user by ID

    return res.json(deleteUser); // Sending response with the deleted user data
  } catch (error) {
    console.log(error); // Logging any errors
    return res.sendStatus(400); // Sending a bad request status if an error occurs
  }
};

// Endpoint to update a user by ID
export const updateUser = async (
  req: express.Request, // Request object parameter with TypeScript type annotation
  res: express.Response // Response object parameter with TypeScript type annotation
) => {
  try {
    const { id } = req.params; // Extracting user ID from request parameters
    const { username } = req.body; // Extracting username from request body

    if (!username) {
      // Checking if username is missing
      return res.sendStatus(400); // Sending a bad request status if username is missing
    }

    const user = await getUserById(id); // Fetching user by ID from the database

    user.username = username; // Updating username property of the user object
    await user.save(); // Saving the updated user object to the database

    return res.json(200).json(user).end(); // Sending response with the updated user data
  } catch (error) {
    console.log(error); // Logging any errors
    return res.sendStatus(400); // Sending a bad request status if an error occurs
  }
};
