
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../utils/errors/bad-request-error");
const ConflictError = require("../utils/errors/conflict-error");
const UnauthorizedError = require("../utils/errors/unauthorized-error");
const NotFoundError = require("../utils/errors/not-found-error");

// Create a new user
const createUser = (req, res, next) => {
  const { name, avatar, email, password: plainPassword } = req.body;
  console.log(req.body);
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
        return next(new ConflictError("Email already exists"));
      }
      const { password, ...userWithoutPassword } = newUser.toObject();
      return res.status(201).json(userWithoutPassword);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000 || err.message === "Email already exists") {
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

// Login
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({ message: "Logged in successfully", token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Email does not exist") {
        return next(new UnauthorizedError("Email does not exist"));
      }

      if (err.message === "Not a valid password") {
        return next(new BadRequestError("Not a valid password"));
      }

      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }
      return next(err);
    });
};

// Get current user
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.json(user);
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

// Update user profile
const updateUserProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (avatar) updateFields.avatar = avatar;

  User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        return next(new NotFoundError("User not found"));
      }
      return res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("User not found"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUserProfile,
};
