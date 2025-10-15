const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const {
  validateUserInfoBody,
  validateUserLogIn,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signup", validateUserInfoBody, createUser);
router.post("/signin", validateUserLogIn, login);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
