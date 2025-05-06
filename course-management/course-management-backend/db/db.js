const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();  // Ky është hap i rëndësishëm për të lexuar të dhënat nga .env

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',       // Përdor host-in nga .env
  user: process.env.DB_USER || 'root',            // Përdor përdoruesin nga .env
  password: process.env.DB_PASSWORD || '',        // Përdor fjalëkalimin nga .env
  database: process.env.DB_NAME || 'course',      // Përdor emrin e bazës nga .env
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database: course');
});

module.exports = db;
