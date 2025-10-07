const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message = err.message || "An error occurred on the server";

  res.status(statusCode).send({
    message,
  });
};
