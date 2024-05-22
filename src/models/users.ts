// Importing Mongoose for interacting with MongoDB
import mongoose from "mongoose";

// Defining the schema for the User collection
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Username field with required constraint
  email: { type: String, required: true }, // Email field with required constraint
  authentication: {
    password: { type: String, required: true, select: false }, // Password field with required constraint and not selected by default
    salt: { type: String, select: false }, // Salt field not selected by default
    sessionToken: { type: String, select: false }, // Session token field not selected by default
  },
});

// Creating the UserModel based on the UserSchema
export const UserModel = mongoose.model("User", UserSchema);

// Function to retrieve all users
export const getUser = () => UserModel.find();

// Function to retrieve a user by email
export const getUserByEmail = (email: String) => UserModel.findOne({ email });

// Function to retrieve a user by session token
export const getUserBySessionToken = (sessionToken: String) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

// Function to retrieve a user by ID
export const getUserById = (id: String) => UserModel.findById({ id });

// Function to create a new user
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((User) => User.toObject());

// Function to delete a user by ID
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });

// Function to update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
