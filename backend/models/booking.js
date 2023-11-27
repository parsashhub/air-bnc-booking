const Joi = require("joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
  numberOfGuests: Number
});

const Booking = mongoose.model("Booking", bookingSchema);

function validateBooking(booking) {
  const schema = Joi.object().keys({
    place: Joi.string().required(),
    checkIn: Joi.string().required(),
    checkOut: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    price: Joi.number().positive().required(),
    numberOfGuests: Joi.number().positive().required(),
  });

  return schema.validate(booking);
}

module.exports = {
  Booking: Booking,
  validate: validateBooking,
};
