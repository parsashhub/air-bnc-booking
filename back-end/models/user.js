const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_PRIVATE_KEY,
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(8).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
}

module.exports = {
  User: User,
  validate: validateUser,
};
