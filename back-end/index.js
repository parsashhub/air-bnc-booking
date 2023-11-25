const express = require("express");
const winston = require("winston");
const cors = require("cors");
require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
require("./startup/routes")(app);
require("./startup/prod")(app);

if (!process.env.JWT_PRIVATE_KEY) {
  throw new Error("private key not defined");
}

console.log("App Env: " + process.env.APP_ENV);
const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}`),
);

module.exports = server;
