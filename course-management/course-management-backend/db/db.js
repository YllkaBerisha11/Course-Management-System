// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'course',  // Baza e të dhënave
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database: course');
});

module.exports = db;
