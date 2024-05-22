// The Express framework and assign it to the 'express' variable
import express from "express";

// Import middleware for parsing request bodies
import bodyParser from "body-parser";

// Import middleware for parsing cookies
import cookieParser from "cookie-parser";

// Import middleware for compressing HTTP responses
import compression from "compression";

// Import middleware for enabling CORS (Cross-Origin Resource Sharing)
import cors from "cors";

// This will load and configure dotenv
import "dotenv/config";

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Import router for handling routes
import router from "./router";

// Create an instance of the Express application
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) middleware with credentials support
app.use(
  cors({
    credentials: true,
  })
);

// Enable compression middleware to compress HTTP responses
app.use(compression());

// Enable cookie parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Enable JSON body parser middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

// Start the server listening on port 8080
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

// Log any errors that occur during the MongoDB connection process
mongoose.connection.on("error", (error: Error) => console.log(error));

// Mount the router middleware to handle requests at the root URL
app.use("/", router());
