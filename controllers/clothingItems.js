// NEW (ERROR HANDLING)
const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/errors/bad-request-error");
const NotFoundError = require("../utils/errors/not-found-error");
const ForbiddenError = require("../utils/errors/forbidden-error");

// Get all clothing items
const getClothingItems = (req, res, next) => {
  ClothingItem.find()
    .then((items) => res.json(items))
    .catch((err) => {
      next(err);
    });
};

// Create new clothing item
const createNewClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((newItem) => res.status(201).json(newItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

// Delete clothing item
const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!itemId || !mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      if (item.owner._id.toString() !== req.user._id.toString()) {
        return next(
          new ForbiddenError("You cannot delete items added by other users"),
        );
      }
      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        if (!deletedItem) {
          return next(new NotFoundError("Item not found"));
        }
        return res.json({
          message: `Item: ${deletedItem._id} deleted successfully`,
        });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

module.exports = {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
};
