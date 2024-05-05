const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

// Returns all clothing items
router.get("/items", getClothingItems);

// Creates a new clothing item
router.post("/items", authMiddleware, createNewClothingItem);

// Deletes a clothing item
router.delete("/items/:itemId", authMiddleware, deleteClothingItem);

module.exports = router;
