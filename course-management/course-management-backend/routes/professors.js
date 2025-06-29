// backend/routes/professors.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM professors', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { name, email, subject } = req.body;
  db.query('INSERT INTO professors (name, email, subject) VALUES (?, ?, ?)', [name, email, subject], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, name, email, subject });
  });
});

router.put('/:id', (req, res) => {
  const { name, email, subject } = req.body;
  db.query('UPDATE professors SET name = ?, email = ?, subject = ? WHERE id = ?', [name, email, subject, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Updated' });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM professors WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
