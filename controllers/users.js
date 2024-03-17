const User = require("../models/user");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require("../utils/errors");

// Get all users
const getUsers = (req, res) => {
  try {
    const users = User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
const getUser = (req, res) => {
  try {
    const user = User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    return res
      .status(INVALID_DATA_ERROR)
      .json({ message: "Name and avatar are required" });
  }

  try {
    const user = new User({ name, avatar });
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
