// NEW (ERROR HANDLING)
const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
// const {
//   INVALID_DATA_ERROR,
//   NOT_FOUND_ERROR,
//   SERVER_ERROR,
//   FORBIDDEN_ERROR,
// } = require("../utils/errors");
const BadRequestError = require("../utils/errors/bad-request-error");
const NotFoundError = require("../utils/errors/not-found-error");
const ForbiddenError = require("../utils/errors/forbidden-error");

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => res.json(items))
    .catch((err) => {
      next(err);
    });
};

// Create new clothing item
const createNewClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((newItem) => res.status(201).json(newItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

// Delete clothing item
const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!itemId || !mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  return ClothingItem.findById(req.params.itemId)
    .then((item) => {
      if (!item) {
        next(new NotFoundError("Item not found"));
      } else if (item.owner._id.toString() !== req.user._id.toString()) {
        next(
          new ForbiddenError("You cannot delete items added by other users"),
        );
      } else {
        return ClothingItem.findByIdAndDelete(req.params.itemId)
          .then((deletedItem) => {
            if (!deletedItem) {
              next(new NotFoundError("Item not found"));
            } else {
              res.json({
                message: `Item: ${deletedItem._id} deleted successfully`,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.name === "CastError") {
              next(new BadRequestError("Invalid item ID"));
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

module.exports = {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
};
