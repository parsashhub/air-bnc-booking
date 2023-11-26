const mongoose = require("mongoose");
const winston = require("winston");
const { DB_URL, DB_LOCAL } = process.env;
module.exports = function () {
  mongoose
    .connect(DB_LOCAL)
    .then(() =>
      winston.info(
        `Connected to DB Successfully`,
      ),
    );
};
