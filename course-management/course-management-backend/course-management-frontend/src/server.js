const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Krijo lidhjen me bazën e të dhënave
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Shto fjalëkalimin e duhur nëse është e nevojshme
  database: 'course'  // Emri i bazës së të dhënave
});

connection.connect((err) => {
  if (err) {
    console.error('Gabim gjatë lidhjes me MySQL:', err);
  } else {
    console.log('Lidhja me MySQL u krye me sukses!');
  }
});

// Aktivizo CORS dhe body parser
app.use(cors());
app.use(bodyParser.json());

// Endpoint për shtimin e një profesori
app.post('/api/professors', (req, res) => {
  const { name, email, specialty, course_id } = req.body;

  const query = 'INSERT INTO professors (name, email, specialty, course_id) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, specialty, course_id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë shtimit të profesorit:', err);
      return res.status(500).send('Ka ndodhur një gabim gjatë shtimit të profesorit.');
    }
    res.status(200).json({ id: result.insertId, name, email, specialty, course_id });
  });
});

// Serveri dëgjon për kërkesa në portin 3001
app.listen(3001, () => {
  console.log('Serveri është duke punuar në portin 3001');
});
