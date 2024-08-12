const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const { validateEditUser } = require("../middlewares/validation");

// Get current user
router.get("/users/me", authMiddleware, getCurrentUser);

// Update user profile
router.patch("/users/me", authMiddleware, validateEditUser, updateUserProfile);

module.exports = router;
