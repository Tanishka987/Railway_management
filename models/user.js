const db = require("../db");

const createUserTable = () => {
  db.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `,
    (err, result) => {
      if (err) {
        console.error("Error creating users table:", err);
      } else {
        console.log("Users table created successfully");
      }
    }
  );
};

module.exports = {
  createUserTable,
};
