const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError" || err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Name, avatar, email, and password are required" });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
      } else if (err.code === 11000) {
        res
          .status(CONFLICT)
          .send({ message: "User with this email already exists" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

module.exports = { getUsers, getUserById, createUser };
