const User = require("../models/user");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require("../utils/errors");

// Get all users
const getUsers = (req, res) => {
  User.find()
  .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Get a user by ID
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.create({ name, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
