const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Përdor connection të thjeshtë me callback
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'course',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database: course');
});

module.exports = db;
