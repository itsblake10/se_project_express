const router = require("express").Router();
const {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

// Returns all clothing items
router.get("/clothingItems", getClothingItems);

// Creates a new clothing item
router.post("/clothingItems", createNewClothingItem);

// Deletes a clothing item
router.delete("/users", deleteClothingItem);

module.exports = router;
