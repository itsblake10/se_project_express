const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

// const { getUsers, getUser, createUser } = require("../controllers/users");

// Returns all users
// router.get("/users", getUsers);

// Returns a user by _id
// router.get("/users/:userId", getUser);

// Creates a new user
// router.post("/users", createUser);

// Get current user
router.get("/users/me", authMiddleware, getCurrentUser);

// Update user profile
router.patch("/users/me", authMiddleware, updateUserProfile);

module.exports = router;
