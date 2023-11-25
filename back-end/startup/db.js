const mongoose = require("mongoose");
const winston = require("winston");
const { DB, DB_TEST, APP_ENV } = process.env;
module.exports = function () {
  mongoose
    .connect(APP_ENV === "test" ? DB_TEST : DB)
    .then(() =>
      winston.info(
        `connected to ${APP_ENV === "test" ? DB_TEST : DB} successfully`,
      ),
    );
};
