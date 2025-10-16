const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../utils/errors/NotFoundError");
const {
  validateUserInfoBody,
  validateUserLogIn,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signup", validateUserInfoBody, createUser);
router.post("/signin", validateUserLogIn, login);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
