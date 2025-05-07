// backend/models/candidateModel.js
const mysql = require('mysql2');

// Lidhja me bazën e të dhënave
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'course'
});

connection.connect((err) => {
  if (err) {
    console.error('Gabim gjatë lidhjes me MySQL:', err);
  } else {
    console.log('Lidhja me MySQL u krye me sukses!');
  }
});

module.exports = connection;
