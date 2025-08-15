const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(BAD_REQUEST).send({
      message: "Name, weather, and imageUrl are required",
    });
  }

  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      return error;
    })
    .then((item) => {
      res.send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError" || err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
