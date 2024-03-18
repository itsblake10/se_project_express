const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require("../utils/errors");

// Get all clothing items
const getClothingItems = (req, res) => {
  try {
    const items = ClothingItem.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    if (err.name === "notFoundError") {
      return res.status(NOT_FOUND_ERROR).send({ message: "Items not found" });
    } else {
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    }
  }
};

// Create new clothing item
const createNewClothingItem = (req, res) => {
  const { name, weather, imageUrl, ownerId } = req.body || {};

  if (!name || !weather || !imageUrl || !ownerId) {
    return res
      .status(INVALID_DATA_ERROR)
      .send({ message: "Name, weather, imageUrl, and ownerId are required" });
  }

  const item = new ClothingItem({
    name,
    weather,
    imageUrl,
    owner: ownerId,
  });

  try {
    const newItem = item.save();
    return res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(INVALID_DATA_ERROR)
        .send({ message: "Invalid data provided" });
    } else {
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    }
  }
};

// Delete clothing item
const deleteClothingItem = (req, res) => {
  try {
    const deletedItem = ClothingItem.findByIdAndDelete(req.params.itemId);
    if (deletedItem) {
      res.json({ message: "Item deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    if (err.name === "notFoundError") {
      return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
    } else {
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    }
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
};
