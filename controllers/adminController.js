const db = require("../db");
const { check, validationResult } = require("express-validator");

exports.addTrain = [
  check("source", "Source is required").notEmpty(),
  check("destination", "Destination is required").notEmpty(),
  check("total_seats", "Total seats must be a positive integer")
    .notEmpty()
    .isInt({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { source, destination, total_seats } = req.body;
    db.query(
      "INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)",
      [source, destination, total_seats],
      (err, result) => {
        if (err) {
          console.error("Error adding train:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "Train added successfully" });
      }
    );
  },
];
exports.getTrains = (req, res) => {
  db.query("SELECT * FROM trains", (err, results) => {
    if (err) {
      console.error("Error fetching train details:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
};
