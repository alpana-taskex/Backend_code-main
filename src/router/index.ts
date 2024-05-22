// Importing Express framework for creating server endpoints
import express from "express";

// Importing authentication router
import authentication from "./authentication";

// Importing users router
import users from "./users";

import post from "./post";

// Creating an instance of Express router
const router = express.Router();

// Exporting a function that initializes and returns the router
export default (): express.Router => {
  authentication(router); // Attaching authentication routes to the router
  // Note: Assuming authentication(router) attaches authentication-related routes to the router
  users(router);

  post(router);

  return router; // Returning the router instance
};
