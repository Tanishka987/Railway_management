const { check } = require("express-validator");

const validateBooking = [
  check("train_id", "Train ID is required").notEmpty(),
  check("user_id", "User ID is required").notEmpty(),
];

const validateSeatAvailability = [
  check("source", "Source is required").notEmpty(),
  check("destination", "Destination is required").notEmpty(),
];

module.exports = { validateBooking, validateSeatAvailability };
