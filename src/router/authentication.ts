// Importing Express framework for creating server endpoints
import express from "express";

// Importing login and register controller functions from authentication module
import { login, register } from "../controllers/auth";

// Exporting a function that takes a router and defines authentication routes
export default (router: express.Router) => {
  router.post("/auth/register", register); // POST endpoint for user registration
  router.post("/auth/login", login); // POST endpoint for user login
};
