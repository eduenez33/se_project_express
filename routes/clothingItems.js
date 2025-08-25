const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");
const auth = require("../middleware/auth");

router.get("/", getClothingItems);
router.post("/", auth, createClothingItem);
router.delete("/:itemId", auth, deleteClothingItem);
router.put("/:itemId/likes", auth, addLike);
router.delete("/:itemId/likes", auth, removeLike);

module.exports = router;
