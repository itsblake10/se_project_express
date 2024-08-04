const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

// Returns all clothing items
router.get("/items", getClothingItems);

// Creates a new clothing item
router.post(
  "/items",
  authMiddleware,
  validateClothingItem,
  createNewClothingItem,
);

// Deletes a clothing item
router.delete("/items/:itemId", authMiddleware, validateId, deleteClothingItem);

module.exports = router;
