const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Rruga drejt databazës

// Merr të gjithë kandidatët
router.get('/', (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) {
      console.error('Gabim GET /candidates:', err);
      return res.status(500).json({ error: 'Gabim gjatë marrjes së kandidatëve.' });
    }
    res.json(results);
  });
});

// Shto kandidat të ri
router.post('/', (req, res) => {
  const { name, email, phone, course_id } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Emri dhe email janë të detyrueshme.' });
  }

  const courseIdParsed = course_id ? parseInt(course_id) : null;

  const sql = 'INSERT INTO candidates (NAME, email, phone, course_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone || null, courseIdParsed], (err, result) => {
    if (err) {
      console.error('Gabim POST /candidates:', err);
      return res.status(500).json({ error: 'Gabim gjatë shtimit të kandidatëve.' });
    }
    res.status(201).json({ id: result.insertId, name, email, phone, course_id: courseIdParsed });
  });
});

// Përditëso kandidat ekzistues
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone, course_id } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Emri dhe email janë të detyrueshme.' });
  }

  const courseIdParsed = course_id ? parseInt(course_id) : null;

  const sql = 'UPDATE candidates SET NAME = ?, email = ?, phone = ?, course_id = ? WHERE id = ?';
  db.query(sql, [name, email, phone || null, courseIdParsed, id], (err, result) => {
    if (err) {
      console.error('Gabim PUT /candidates/:id:', err);
      return res.status(500).json({ error: 'Gabim gjatë përditësimit të kandidatëve.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Kandidat nuk u gjet.' });
    }
    res.json({ message: 'Kandidati u përditësua me sukses' });
  });
});

// Fshi kandidat
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM candidates WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Gabim DELETE /candidates/:id:', err);
      return res.status(500).json({ error: 'Gabim gjatë fshirjes së kandidatëve.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Kandidat nuk u gjet.' });
    }
    res.json({ message: 'Kandidati u fshi me sukses' });
  });
});

module.exports = router;
