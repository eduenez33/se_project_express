const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateClothingItemBody,
  validateId,
} = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateClothingItemBody, createClothingItem);
router.delete("/:itemId", auth, validateId, deleteClothingItem);
router.put("/:itemId/likes", auth, validateId, addLike);
router.delete("/:itemId/likes", auth, validateId, removeLike);

module.exports = router;
