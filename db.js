const mysql = require("mysql2");
const config = require("./config/config");


const db = mysql.createPool({
  ...config.db,
  waitForConnections: true,  
  connectionLimit: 10,       
  queueLimit: 0,             
});


db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
    connection.release(); 
  }
});

module.exports = db;
