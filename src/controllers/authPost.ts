// Importing required modules from express and mongoose
import { Request, Response } from "express";
import { Types } from "mongoose";
import Post, { IPost } from "../models/post";

// Define an interface to extend Request that includes user information
interface AuthRequest extends Request {
  user?: {
    id: Types.ObjectId;
  };
}

// Controller function to create a new post
export const createPost = async (req: AuthRequest, res: Response) => {
  // Extract content from request body
  const { content } = req.body;
  // Get user id from request
  const userId = req.user?.id;

  try {
    // Create a new post object
    const post = new Post({ user: userId, content });
    // Save the post to the database
    await post.save();
    // Respond with the created post
    res.json(post);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    // Find all posts and populate user and comments fields
    const posts = await Post.find()
      .populate("user", ["username"])
      .populate("comments.user", ["username"]);
    // Respond with the posts
    res.json(posts);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to like a post
export const likePost = async (req: AuthRequest, res: Response) => {
  // Extract post id from request parameters
  const postId = req.params.id;
  // Get user id from request
  const userId = req.user?.id;

  try {
    // Find the post by id
    const post = (await Post.findById(postId)) as IPost;

    // Check if post exists
    if (!post) {
      // If post not found, respond with error
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if post already liked by user
    if (post.likes.includes(userId!)) {
      // If post already liked by user, respond with error
      return res.status(400).json({ message: "Post already liked" });
    }

    // Add user id to likes array
    post.likes.push(userId!);
    // Save the updated post
    await post.save();

    // Respond with the updated post
    res.json(post);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to add a comment to a post
export const commentOnPost = async (req: AuthRequest, res: Response) => {
  // Extract post id from request parameters
  const postId = req.params.id;
  // Get user id from request
  const userId = req.user?.id;
  // Extract comment text from request body
  const { text } = req.body;

  try {
    // Find the post by id
    const post = (await Post.findById(postId)) as IPost;

    // Check if post exists
    if (!post) {
      // If post not found, respond with error
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment object
    const comment = { user: userId!, text };
    // Add the comment to the post
    post.comments.push(comment);
    // Save the updated post
    await post.save();

    // Respond with the updated post
    res.json(post);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
  }
};
