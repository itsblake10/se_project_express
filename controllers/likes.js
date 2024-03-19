// Like Item
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      res.json({ message: "Item liked successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid data provided" });
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
    .orFail(() => ({ name: "DocumentNotFoundError" }))
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
