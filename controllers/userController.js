const db = require("../db");
const { validationResult, check } = require("express-validator");

exports.registerUser = [
  check("username", "Username is required").notEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  },
];

exports.loginUser = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          console.error("Error logging in:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (result.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = Buffer.from(
          JSON.stringify({ userId: result[0].id })
        ).toString("base64");
        res.json({ token });
      }
    );
  },
];
