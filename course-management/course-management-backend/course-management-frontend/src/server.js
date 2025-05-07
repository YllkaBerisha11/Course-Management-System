// server.js (ose app.js, në varësi të konfigurimit tuaj)

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // Përdorni CORS për të lejuar kërkesa nga frontend

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Për të lejuar marrjen e JSON nga kërkesat

// Konfigurimi i lidhjes me databazën
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Zëvendëso me përdoruesin tuaj të MySQL
  password: '', // Zëvendëso me fjalëkalimin tuaj të MySQL
  database: 'course_management_system', // Zëvendëso me emrin e databazës tuaj
});

// Krijo lidhjen me databazën
connection.connect((err) => {
  if (err) {
    console.error('Gabim gjatë lidhjes me databazën:', err);
    return;
  }
  console.log('Lidhja me databazën është krijuar.');
});

// API për pagesat

// Shto pagesë të re (Create)
app.post('/api/payments', (req, res) => {
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
    res.status(200).json({ id: result.insertId, candidate_id, course_id, payment_amount, payment_method, payment_status });
  });
});

// Merr të gjitha pagesat (Read)
app.get('/api/payments', (req, res) => {
  const query = 'SELECT * FROM payments';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Gabim gjatë marrjes së pagesave:', err);
      return res.status(500).send('Gabim gjatë marrjes së pagesave.');
    }
    res.status(200).json(result);
  });
});

// Përditëso një pagesë ekzistuese (Update)
app.put('/api/payments/:id', (req, res) => {
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
    res.status(200).json({ id, candidate_id, course_id, payment_amount, payment_method, payment_status });
  });
});

// Fshi një pagesë (Delete)
app.delete('/api/payments/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM payments WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Gabim gjatë fshirjes së pagesës:', err);
      return res.status(500).send('Gabim gjatë fshirjes së pagesës.');
    }
    res.status(200).send(`Pagesa me ID ${id} u fshi me sukses.`);
  });
});

// Dëgjo në portin 3001
app.listen(port, () => {
  console.log(`Serveri po dëgjon në portin ${port}`);
});
