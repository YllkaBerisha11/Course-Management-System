const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { name, email, phone, course_id } = req.body;
  const sql = 'INSERT INTO candidates (name, email, phone, course_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Kandidati u shtua me sukses', id: result.insertId });
  });
});

// READ
router.get('/', (req, res) => {
  const sql = `
    SELECT c.id, c.name, c.email, c.phone, cs.title AS course_title
    FROM candidates c
    LEFT JOIN courses cs ON c.course_id = cs.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { name, email, phone, course_id } = req.body;
  const sql = 'UPDATE candidates SET name = ?, email = ?, phone = ?, course_id = ? WHERE id = ?';
  db.query(sql, [name, email, phone, course_id, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Kandidati u përditësua me sukses' });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM candidates WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Kandidati u fshi me sukses' });
  });
});

module.exports = router;
