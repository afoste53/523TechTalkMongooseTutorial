// Utility function for connecting to the database

// Imports
import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  // The URI for your specific db
  // Supplied when you set up the database
  const mongoURI =
    "mongodb+srv://dbUser:password123456@cluster0.ytvrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  // We can create an object that configures any
  // options we want to set
  // (these are all "required" sorta - see mongo docs)
  const requiredOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  try {
    //  Pass the URI for our DB as first param
    // Pass options that it will yell at you if you won't have
    const conn = await mongoose.connect(mongoURI, requiredOptions);

    console.log(`MongoDB Connected : ${conn.connection.host}`.magenta.bold);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
