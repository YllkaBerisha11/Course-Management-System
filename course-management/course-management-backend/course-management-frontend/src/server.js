// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // për JSON në body

// Konfigurimi i databazës
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // ndrysho sipas konfigurimit tënd
  password: '',       // ndrysho sipas konfigurimit tënd
  database: 'course_management_system', // ndrysho sipas emrit të databazës
});

connection.connect(err => {
  if (err) {
    console.error('Gabim gjatë lidhjes me databazën:', err);
    process.exit(1);
  }
  console.log('Lidhja me databazën është krijuar.');
});

// CREATE - shto pagesë
app.post('/payments', (req, res) => {
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;
  const query = `
    INSERT INTO payments (candidate_id, course_id, payment_amount, payment_method, payment_status)
    VALUES (?, ?, ?, ?, ?)
  `;
  connection.query(query, [candidate_id, course_id, payment_amount, payment_method, payment_status || 'pending'], (err, result) => {
    if (err) {
      console.error('Gabim gjatë shtimit të pagesës:', err);
      return res.status(500).send('Gabim gjatë shtimit të pagesës.');
    }
    res.status(201).json({ id: result.insertId, candidate_id, course_id, payment_amount, payment_method, payment_status });
  });
});

// READ - merr të gjitha pagesat
app.get('/payments', (req, res) => {
  const query = 'SELECT * FROM payments';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Gabim gjatë marrjes së pagesave:', err);
      return res.status(500).send('Gabim gjatë marrjes së pagesave.');
    }
    res.json(results);
  });
});

// UPDATE - përditëso pagesë sipas id
app.put('/payments/:id', (req, res) => {
  const { id } = req.params;
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;
  const query = `
    UPDATE payments SET candidate_id = ?, course_id = ?, payment_amount = ?, payment_method = ?, payment_status = ?
    WHERE id = ?
  `;
  connection.query(query, [candidate_id, course_id, payment_amount, payment_method, payment_status, id], (err) => {
    if (err) {
      console.error('Gabim gjatë përditësimit të pagesës:', err);
      return res.status(500).send('Gabim gjatë përditësimit të pagesës.');
    }
    res.json({ id, candidate_id, course_id, payment_amount, payment_method, payment_status });
  });
});

// DELETE - fshi pagesë sipas id
app.delete('/payments/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM payments WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Gabim gjatë fshirjes së pagesës:', err);
      return res.status(500).send('Gabim gjatë fshirjes së pagesës.');
    }
    res.sendStatus(204); // No Content
  });
});

// Serveri dëgjon në portin 3001
app.listen(port, () => {
  console.log(`Serveri po dëgjon në portin ${port}`);
});
