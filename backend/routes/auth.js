const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = body;
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("invalid email or password");

  const validPsw = await bcrypt.compare(password, user.password);
  if (!validPsw) return res.status(400).send("invalid email or password");

  const token = user.generateAuthToken();
  res
    .cookie("token", token)
    .send({ data: _.pick(user, ["name", "email", "_id"]) });
});

router.post("/logout", async (req, res) => {
  res.cookie("token", "").send({ message: "logged out successfully" });
});

function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(10).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
