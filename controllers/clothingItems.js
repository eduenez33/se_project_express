const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => res.status(500).send({ message: "Error fetching items" }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => res.status(400).send({ message: "Error creating item" }));
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send({ message: "Item deleted successfully" });
    })
    .catch((err) => res.status(500).send({ message: "Error deleting item" }));
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
