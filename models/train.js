const db = require("../db");

const createTrainTable = () => {
  db.query(
    `
    CREATE TABLE IF NOT EXISTS trains (
      id INT AUTO_INCREMENT PRIMARY KEY,
      source VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      total_seats INT NOT NULL
    )
  `,
    (err, result) => {
      if (err) {
        console.error("Error creating trains table:", err);
      } else {
        console.log("Trains table created successfully");
      }
    }
  );
};

module.exports = {
  createTrainTable,
};
