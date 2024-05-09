// NEW
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");

// NEW Create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password: plainPassword } = req.body;
  bcrypt
    .hash(plainPassword, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      }),
    )
    .then((newUser) => {
      if (!newUser) {
        throw new Error("Email already exists");
      }
      const { password, ...userWithoutPassword } = newUser.toObject();
      res.status(201).json(userWithoutPassword);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000 || err.message === "Email already exists") {
        return res
          .status(CONFLICT_ERROR)
          .json({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .json({ message: "Invalid data provided" });
      }
      return res
        .status(SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

// NEW Login
const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log(token);
      res.json({ message: "Logged in successfully", token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Email does not exist") {
        return res
          .status(INVALID_DATA_ERROR)
          .json({ message: "Email does not exist" });
      }

      if (err.message === "Not a valid password") {
        return res
          .status(INVALID_DATA_ERROR)
          .json({ message: "Not a valid password" });
      }

      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED_ERROR)
          .json({ message: "Incorrect email or password" });
      }
      return res
        .status(SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

// NEW Get current user
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// NEW Update user profile
const updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;
  console.log(req.user);
  const userId = req.user._id;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (avatar) updateFields.avatar = avatar;

  User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      }
      return res.json(updatedUser);
    })
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
  createUser,
  login,
  getCurrentUser,
  updateUserProfile,
};
