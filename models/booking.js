const db = require("../db");

const createBookingTable = async () => {
  try {
    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        train_id INT NOT NULL,
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (train_id) REFERENCES trains(id),
        UNIQUE (user_id, train_id) -- Prevent duplicate bookings for the same train and user
      )
    `);
    console.log("Bookings table created successfully");
  } catch (err) {
    console.error("Error creating bookings table:", err);
  }
};

module.exports = { createBookingTable };
