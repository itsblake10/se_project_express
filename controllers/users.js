//##
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  UNAUTHORIZED_ERROR,
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

//# Create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      });
    })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Email already exists" });
      }
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

//# Login
const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .select("+password")
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ message: `${user} logged in successfully`, token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "Unauthorized") {
        return res
          .status(UNAUTHORIZED_ERROR)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

//# Get current user
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

//# Update user profile
const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid data provided" });
      }
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  updateUserProfile,
};
