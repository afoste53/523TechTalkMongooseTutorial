// Import the model
import User from "../models/Users.js";

// It's in the CRUD controller functions that we
// find the various mongoDb queries

// Create a new user
// POST /api/users
const createUser = async (req, res) => {
  // Pull info from body of request
  const { name, email, password, role, age } = req.body;

  // We can use findOne() to see if the user already exists
  const userExists = await User.findOne({ email });
  // OR we can make it more readable by chaining commands
  // const userExists = await User.findOne().where('email').equals(`${email}`);

  // If they exists we return 400 and complain
  if (userExists) {
    res.status(400).send({
      Success: false,
      Error: "User already associated with this email",
    });
  }

  try {
    // If they don't exist, we need to create the new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      age,
    });
    res.status(201).json({
      Success: true,
      user,
    });
  } catch (err) {
    res.status(400).send({
      Success: false,
      Error: err.message,
    });
  }
};

// Read(get) all users
// GET /api/users
const getAllUsers = async (req, res) => {
  // We can use find() to pull all documents that matches our filter
  // We pass no filter to return all documents in the DB
  // This will return an array of all users
  const users = await User.find();

  // If the db wasn't empty we will send whatever we 'find()ed'
  if (users.length > 0) {
    try {
      res.status(200).json({
        Success: true,
        Number_of_Users: users.length,
        users,
      });
    } catch (err) {
      res.status(400).json({ Success: false, Error: err.message });
    }
  } else {
    res.status(400).json({ Success: false, Error: "No users found" });
  }
};

// Read(get) specific user by id
// GET /api/users/:id
const getUserById = async (req, res) => {
  // Get the id from the request parameters object
  const id = req.params.id;

  // We can use find() with a filter
  const user = await User.find({ _id: id });
  // OR findById()
  //const user = await User.findById(id);

  if (user.length !== 0) {
    // if using findById(), check to see if(user)
    try {
      res.status(200).json({ Success: true, user });
    } catch (err) {
      res.status(404).json({
        Success: false,
        Error: err.message,
      });
    }
  } else {
    res.status(404).json({
      Success: false,
      Error: `User not found with id of ${id}`,
    });
  }
};

// Update a  user
// PUT /api/users/:id
const updateUser = async (req, res) => {
  // Pull the user's _id from the request parameters
  const id = req.params.id;

  // Pull info from body of request
  const { name, email, password, role, age } = req.body;

  try {
    // We can use findOneAndUpdate()
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, email, password, role, age }
    );

    /*
    // OR we chain an updateOne() call to a find()
    await User.findById(id).updateOne(
      {},
      {
        name,
        email,
        password,
        role,
        age,
      }
    );*/

    res.status(202).json({
      Success: true,
      // findOneAndUpdate() returns the user fields before they
      // were updated
      // You can disable this by
      user,
    });
  } catch (err) {
    res.status(404).json({
      Success: false,
      Error: err.message,
    });
  }
};

// DELETE a user by ID
// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    // Similar to updating a user we can findOneAndDelete()
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        Success: false,
        Error: `No user found with id of ${id}`,
      });
    }
    // OR we can chain deleteOne() to a find() call
    // await User.find({_id: id}).deleteOne();
    res
      .status(200)
      .json({ Success: true, Message: `User with id of ${id} deleted` });
    return;
  } catch (err) {
    res.status(404).json({
      Success: false,
      Error: err.message,
    });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
