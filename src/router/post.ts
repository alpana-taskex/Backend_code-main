// Importing Express framework for creating server endpoints
import express from "express";

// Importing controller functions for handling post-related operations
import {
  createPost,
  getPosts,
  likePost,
  commentOnPost,
} from "../controllers/authPost";

// Importing middleware function for post authentication
import { isAuthenticated, isOwner } from "../middlewares";

// Exporting a function that defines routes related to post operations

export default (router: express.Router) => {
  router.get("/post", isAuthenticated, getPosts);

  router.post("/post/:id", isAuthenticated, isOwner, commentOnPost);

  router.post("/post/:id", isAuthenticated, isOwner, likePost);

  router.put("/post/:id", isAuthenticated, isOwner, createPost);
}; // End of route definition
