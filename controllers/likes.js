const ClothingItem = require("../models/clothingItem");
const {
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  INVALID_DATA_ERROR,
} = require("../utils/errors");

// Like Item UPDATE##
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Dislike Item UPDATE##
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
