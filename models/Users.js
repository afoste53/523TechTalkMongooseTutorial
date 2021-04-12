import mongoose from "mongoose";

// Define schema to define the structure for User
// What makes a User a User?

// const yourSchema = new mongoose.Schema({schema object}, {options object});
// const yourModel = mongoose.model("A_Model", yourSchema);

// Define schema for User model
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // Set required and define the message to be reported if field is left blank
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      // Must be a unique field - think things used to log in
      unique: true,
      // Pattern matching with Regex to make sure it is a valid email
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      // Set minimum length for use during password creation -
      // will trigger an error if doesn't meet this critera
      minlength: 6,
      // We don't want to send the password (or other sensitive info) back and forth
      // set select to false to make sure it's not passed along later when queried
      select: false,
    },
    role: {
      type: "string",
      // By creating enumerations we can add security so that
      // a user can only be created as a user or as an admin
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    // If all you need to specify is the type
    // you don't have to set it to an object, just the type
    age: "number",
  },
  // We can pass an optional options object to enable specific options
  // ex include a timestamp for when it was created/edited
  {
    timestamps: true,
  }
);

// Create the model by passing the name, and schema
const User = mongoose.model("User", UserSchema);
export default User;
