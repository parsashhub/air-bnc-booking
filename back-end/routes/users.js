const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
const { validate, User } = require("../models/user");
const authMiddleware = require("../middleware/auth");

router.post("/", async (req, res) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { name, email, password } = body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("user already registered");

  user = new User({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.status(201).send({ data: _.pick(user, ["name", "email", "_id"]) });
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({ data: user });
});

module.exports = router;
