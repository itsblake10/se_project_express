const router = require("express").Router();
const { likeItem, dislikeItem } = require("../controllers/likes");
const authMiddleware = require("../middlewares/auth");
const { validateId } = require("../middlewares/validation");

// Add Like
router.put("/items/:itemId/likes", authMiddleware, validateId, likeItem);

// Delete Like
router.delete("/items/:itemId/likes", authMiddleware, validateId, dislikeItem);

module.exports = router;
