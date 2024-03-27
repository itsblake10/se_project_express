const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// Returns all users
router.get("/users", getUsers);

// Returns a user by _id
router.get("/users/:userId", getUser);

// Creates a new user
router.post("/users", createUser);

module.exports = router;
