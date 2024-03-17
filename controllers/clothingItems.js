const ClothingItem = require("../models/clothingItem");

// Get all clothing items
const getClothingItems = (req, res) => {
  try {
    const items = ClothingItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new clothing item
const createNewClothingItem = (req, res) => {
  console.log(req.user._id);
  const { name, weather, imageUrl, ownerId } = req.body;

  if (!name || !weather || !imageUrl || !ownerId) {
    return res
      .status(400)
      .json({ message: "Name, weather, imageUrl, and ownerId are required" });
  }

  const item = new ClothingItem({
    name,
    weather,
    imageUrl,
    owner: ownerId,
  });

  try {
    const newItem = item.save();
    return res.status(201).json(newItem); // Explicitly return the response
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete clothing item
const deleteClothingItem = (req, res) => {
  try {
    const deletedItem = ClothingItem.findByIdAndDelete(req.params.itemId);
    if (deletedItem) {
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
};
