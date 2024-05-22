// Importing required modules from mongoose
import mongoose, { Document, Schema, Types } from "mongoose";

// Define the structure of a comment
interface IComment {
  user: Types.ObjectId; // User who made the comment
  text: string; // Content of the comment
}

// Define the structure of a post document
interface IPost extends Document {
  user: Types.ObjectId; // User who created the post
  content: string; // Content of the post
  likes: Types.ObjectId[]; // Users who liked the post
  comments: IComment[]; // Array of comments on the post
}

// Creating a schema for the post document
const postSchema: Schema = new Schema({
  // Field for the user who created the post, referencing the User model
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // Field for the content of the post
  content: { type: String, required: true },
  // Field for storing users who liked the post, referencing the User model
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // Field for storing comments on the post
  comments: [
    {
      // Sub-document for each comment containing user and text fields
      user: { type: Schema.Types.ObjectId, ref: "User" }, // User who made the comment
      text: { type: String, required: true }, // Content of the comment
    },
  ],
});

// Creating a model for the Post document using the schema
const Post = mongoose.model<IPost>("Post", postSchema);

// Exporting the Post model
export default Post;

// Exporting the IPost and IComment interfaces for reuse if needed
export { IPost, IComment };
