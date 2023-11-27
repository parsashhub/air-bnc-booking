const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authMiddleware = require("../middleware/auth");
const { Booking, validate } = require("../models/booking");

router.post("/", authMiddleware, async (req, res) => {
  const { body, user } = req;

  const { error } = validate(body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  try {
    const booking = await Booking.create({ ...body, user: user._id });
    res.status(201).send({ data: _.pick(booking,["_id"]), message: "booked!" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
