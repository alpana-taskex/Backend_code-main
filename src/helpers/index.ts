// Importing Node.js crypto module for cryptographic operations
import crypto from "crypto";

// Function to generate a random string
export const random = () => crypto.randomBytes(128).toString("base64");

const SECRET = "ANTONIO - REST - API"; // Secret key for cryptographic operations

// Function for authentication using HMAC-SHA256
export const authentication = (salt: string, password: string) => {
  // Creating an HMAC object with SHA256 algorithm
  return crypto
    .createHmac("sha256", [salt, password].join("/")) // Combining salt and password with a delimiter
    .update(SECRET) // Updating HMAC with the secret key
    .digest("hex"); // Generating a hexadecimal digest
};
