const Joi = require("joi");
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
});

const Place = mongoose.model("Place", placeSchema);

function validatePlace(place) {
  const schema = Joi.object().keys({
    title: Joi.string().min(5).max(255),
    address: Joi.string().min(5).max(255),
    description: Joi.string().min(5).max(255),
    extraInfo: Joi.string().min(5).max(255),
    checkIn: Joi.string(),
    checkOut: Joi.string(),
    maxGuests: Joi.number(),
    price: Joi.number(),
  });

  return schema.validate(place);
}

module.exports = {
  Place: Place,
  validate: validatePlace,
};
