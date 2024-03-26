const router = require("express").Router();
const {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

// Returns all clothing items
router.get("/items", getClothingItems);

// Creates a new clothing item
router.post("/items", createNewClothingItem);

// Deletes a clothing item
router.delete("/items/:itemId", deleteClothingItem);

module.exports = router;
