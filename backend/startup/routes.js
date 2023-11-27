const express = require("express");
const error = require("../middleware/error");
const users = require("../routes/users");
const auth = require("../routes/auth");
const upload = require("../routes/upload");
const places = require("../routes/places");
const bookings = require("../routes/bookings");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/upload", upload);
  app.use("/api/pics", express.static("uploads"));
  app.use("/api/places", places);
  app.use("/api/bookings", bookings);

  app.use(error);
};
