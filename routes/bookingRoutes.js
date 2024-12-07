const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.bookSeat);

router.get("/seatsAvailability", bookingController.getSeatAvailability);

router.get("/:bookingId", bookingController.getBookingDetails);

module.exports = router;