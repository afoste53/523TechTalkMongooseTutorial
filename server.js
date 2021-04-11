// Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./util/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

// Set up to read (potentially) sensitive data we've stored in a .env file
// Don't forget to add this to your .gitignore file
dotenv.config();

// Connect to our database
connectDB();

// Set up new Express app to run our server
const app = express();
app.use(express.json());

// Tell the server what to do with calls to certain routes
app.use("/api/users", userRoutes);

// Connect to port specified in .env OR 5000 as default and listen
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.green.bold
  )
);
