const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// Returns all users
router.get("/", getUsers);

// Returns a user by _id
router.get("/:userId", getUser);

// Creates a new user
router.post("/", createUser);

module.exports = router;
