const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Place, validate } = require("../models/place");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const data = req.body;
  const { error } = validate(data);
  if (!error)
    return res.status(400).send({ message: error.details[0].message });

  const place = await Place.create({
    owner: req.user._id,
    ...data,
  });

  res.status(201).send({ data: place });
});

router.get("/", authMiddleware, async (req, res) => {
  const places = await Place.find({owner: req.user._id}).select("-__v")
  res.send({ data: places });
});

module.exports = router;
