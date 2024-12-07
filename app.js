const express = require("express");
const { validationResult, check } = require("express-validator");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const config = require("./config/config");
const db = require("./db");
const { createUserTable } = require("./models/user");
const { createTrainTable } = require("./models/train");
const { createBookingTable } = require("./models/booking");

const app = express();

require('dotenv').config();
createUserTable();
createTrainTable();
createBookingTable();

app.use(express.json());

app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Booking API");
});