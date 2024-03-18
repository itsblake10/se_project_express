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
  } catch (err) {
    console.error(err);
    if (err.name === "notFoundError") {
      return res.status(NOT_FOUND_ERROR).send({ message: "Users not found" });
    } else {
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    }
  }
};

// Get a user by ID
const getUser = (req, res) => {
  try {
    const user = User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(SERVER_ERROR)
      .send({ message: "An error has occurred on the server" });
  }
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body || {};

  if (!name || !avatar) {
    return res
      .status(INVALID_DATA_ERROR)
      .send({ message: "Name and avatar are required" });
  }

  User.create({ name, avatar })
    .then((newUser) => {
      return res.status(201).send(newUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid data provided" });
      } else {
        return res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
