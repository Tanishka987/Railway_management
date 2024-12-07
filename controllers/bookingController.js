const db = require("../db");
const { validationResult } = require("express-validator");

exports.bookSeat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { train_id, user_id } = req.body;

  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    try {
      await connection.beginTransaction();

      
      const [existingBooking] = await connection.promise().query(
        "SELECT * FROM bookings WHERE train_id = ? AND user_id = ?",
        [train_id, user_id]
      );

      if (existingBooking.length > 0) {
        connection.rollback();
        connection.release();
        return res.status(400).json({ message: "Seat already booked" });
      }

      // Insert new booking
      await connection.promise().query(
        "INSERT INTO bookings (train_id, user_id) VALUES (?, ?)",
        [train_id, user_id]
      );

      await connection.commit();
      connection.release();
      res.json({ message: "Seat booked successfully" });
    } catch (err) {
      connection.rollback();
      connection.release();
      console.error("Error booking seat:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// Get seat availability
exports.getSeatAvailability = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { source, destination } = req.query;

  try {
    const [trains] = await db.promise().query(
      "SELECT * FROM trains WHERE source = ? AND destination = ?",
      [source, destination]
    );

    if (trains.length === 0) {
      return res.status(404).json({ message: "No trains found for the given route" });
    }

    const trainIds = trains.map((train) => train.id);
    const [bookings] = await db.promise().query(
      "SELECT train_id, COUNT(*) as booked_seats FROM bookings WHERE train_id IN (?) GROUP BY train_id",
      [trainIds]
    );

    const seatAvailability = trains.map((train) => {
      const bookedSeats =
        bookings.find((booking) => booking.train_id === train.id)?.booked_seats || 0;
      const availableSeats = train.total_seats - bookedSeats;
      return {
        train_id: train.id,
        source: train.source,
        destination: train.destination,
        available_seats: availableSeats,
      };
    });

    res.json(seatAvailability);
  } catch (err) {
    console.error("Error fetching seat availability:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get booking details
exports.getBookingDetails = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const [booking] = await db.promise().query(
      "SELECT * FROM bookings WHERE id = ?",
      [bookingId]
    );

    if (booking.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking[0]);
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
