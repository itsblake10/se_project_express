const ClothingItem = require("../models/clothingItem");
const { NOT_FOUND_ERROR, SERVER_ERROR } = require("../utils/errors");

// Like Item
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user.userId },
    },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.send({
        message: `Item with ID ${updatedItem._id} liked successfully`,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Dislike Item
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.json({
        message: `Item with ID ${updatedItem._id} disliked successfully`,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
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
