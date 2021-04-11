// Import the model
import User from "../models/Users.js";

// GET all users
// GET /api/users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (users) {
    try {
      res.status(200).json({
        Success: true,
        users,
      });
    } catch (err) {
      res.status(400).json({ Success: false, Error: err.message });
    }
  } else {
    res.status(400).json({ Success: false, Error: "No users found" });
  }
};

// GET specific user by id
// GET /api/users/:id
const getUserById = async (req, res) => {
  const id = req.params.id;
  // can use find() with a filter OR findById()
  const user = await User.find({ _id: id });
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

// Register a new user
// POST /api/users
const registerUser = async (req, res) => {
  // Pull info from body of request
  const { name, email, password, type, fav_iceCream } = req.body;

  // We can use findOne() method to see if the user already exists
  // and throw error if they do
  // OR we can make it more readable by chaining commands
  const userExists = await User.findOne({ email });
  // const userExists = await User.findOne().where('email').equals(`${email}`);
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
      type,
      fav_iceCream,
    });
    res.status(201).json({
      Success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      "Favorite Ice Cream": user.fav_iceCream,
    });
  } catch (err) {
    res.status(400).send({
      Success: false,
      Error: err.message,
    });
  }
};

// Update a  user
// PUT /api/users/:id
const updateUser = async (req, res) => {
  // Pull info from body of request
  const { name, email, password, type, fav_iceCream } = req.body;
  const id = req.params.id;

  // We can use findOneAndUpdate OR
  // chain an updateOne() call to a find()
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { name, email, password, type, fav_iceCream }
    );
    // await User.findById(id).updateOne(
    //   {},
    //   {
    //     name,
    //     email,
    //     password,
    //     type,
    //     fav_iceCream,
    //   }
    // );
    res.status(202).json({
      Success: true,
      name,
      email,
      password,
      type,
      fav_iceCream,
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
  // Similar to updating a user we can findOneAndDelete() OR
  // chain deleteOne() to a find() call
  try {
    // One stop shop
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        Success: false,
        Error: `No user found with id of ${id}`,
      });
    }
    // OR
    // await User.find({_id: id}).deleteOne();
    res
      .status(200)
      .json({ Success: true, Message: `User with id of ${id} deleted` });
  } catch (err) {
    res.status(404).json({
      Success: false,
      Error: err.message,
    });
  }
};

export { getAllUsers, getUserById, registerUser, updateUser, deleteUser };
