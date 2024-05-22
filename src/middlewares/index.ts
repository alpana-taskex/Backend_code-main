// Import the express module
import express from "express";

// Import specific functions (get, identity, merge) from the lodash library
import { get, identity, merge } from "lodash";

// Import the getUserBySessionToken function from the db/users module
import { getUserBySessionToken } from "../models/users";

// Define the isOwner middleware function
export const isOwner = async (
  req: express.Request, // Define the request object parameter with TypeScript type annotation
  res: express.Response, // Define the response object parameter with TypeScript type annotation
  next: express.NextFunction // Define the next function parameter with TypeScript type annotation
) => {
  try {
    // Retrieve the 'id' parameter from the request parameters
    const { id } = req.params;

    // Retrieve the 'id' property from the 'identity' property of the request object using lodash's 'get' function
    const currentUserId = get(req, "identity.id") as string;

    // Check if 'currentUserId' is falsy (null, undefined, empty string, etc.)
    if (!currentUserId) {
      // Send a 403 Forbidden status response if 'currentUserId' is falsy
      return res.sendStatus(403);
    }

    // Check if 'currentUserId' is not equal to the 'id' parameter
    if (currentUserId.toString() != id) {
      // Send a 403 Forbidden status response if 'currentUserId' is not equal to 'id'
      return res.sendStatus(403);
    }

    // Call the next middleware function if all checks pass
    next();
  } catch (error) {
    // Log any errors to the console
    console.log(error);
    // Send a 400 Bad Request status response if an error occurs
    return res.sendStatus(400);
  }
};

// Define the isAuthenticated middleware function
export const isAuthenticated = async (
  req: express.Request, // Define the request object parameter with TypeScript type annotation
  res: express.Response, // Define the response object parameter with TypeScript type annotation
  next: express.NextFunction // Define the next function parameter with TypeScript type annotation
) => {
  try {
    // Retrieve the session token from the 'ANTONIO-AUTH' cookie in the request
    const sessionToken = req.cookies["ANTONIO-AUTH"];

    // Check if 'sessionToken' is falsy (null, undefined, empty string, etc.)
    if (!sessionToken) {
      // Send a 403 Forbidden status response if 'sessionToken' is falsy
      return res.sendStatus(403);
    }

    // Call the getUserBySessionToken function to retrieve user data based on the session token
    const existingUser = await getUserBySessionToken(sessionToken);

    // Check if 'existingUser' is falsy (null, undefined, etc.)
    if (!existingUser) {
      // Send a 403 Forbidden status response if 'existingUser' is falsy
      return res.sendStatus(403);
    }

    // Merge the 'identity' property of 'req' object with 'existingUser' using lodash's 'merge' function
    merge(req, { identity: existingUser });

    // Call the next middleware function if all checks pass
    return next();
  } catch (error) {
    // Log any errors to the console
    console.log(error);
    // Send a 400 Bad Request status response if an error occurs
    return res.sendStatus(400);
  }
};
