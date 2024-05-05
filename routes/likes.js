const router = require("express").Router();
const { likeItem, dislikeItem } = require("../controllers/likes");
const authMiddleware = require("../middlewares/auth");

// Add Like
router.put("/items/:itemId/likes", authMiddleware, likeItem);

// Delete Like
router.delete("/items/:itemId/likes", authMiddleware, dislikeItem);

module.exports = router;
