const { getCurrentUser, updateUserProfile } = require("../controllers/users");

const router = require("express").Router();
// const { getUsers, getUser, createUser } = require("../controllers/users");

// Returns all users
// router.get("/users", getUsers);

// Returns a user by _id
// router.get("/users/:userId", getUser);

// Creates a new user
// router.post("/users", createUser);

// Get current user
router.get("/users/me", getCurrentUser);

// Update user profile
router.patch("/users/me", updateUserProfile);

module.exports = router;
