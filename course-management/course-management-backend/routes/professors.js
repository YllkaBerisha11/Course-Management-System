const express = require('express');
const router = express.Router();
const db = require('../db');  // Lidhja me databazën (duhet të kesh një skedar lidhjeje me DB)

// GET all professors
router.get('/', (req, res) => {
  db.query('SELECT * FROM professors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET one professor by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM professors WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Professor not found' });
    res.json(results[0]);
  });
});

// POST create new professor
router.post('/', (req, res) => {
  const { name, email, specialty, course_id } = req.body;
  db.query(
    'INSERT INTO professors (name, email, specialty, course_id) VALUES (?, ?, ?, ?)',
    [name, email, specialty, course_id || null],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Professor created', id: result.insertId });
    }
  );
});

// PUT update professor
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, specialty, course_id } = req.body;
  db.query(
    'UPDATE professors SET name = ?, email = ?, specialty = ?, course_id = ? WHERE id = ?',
    [name, email, specialty, course_id || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Professor not found' });
      res.json({ message: 'Professor updated' });
    }
  );
});

// DELETE professor
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM professors WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Professor not found' });
    res.json({ message: 'Professor deleted' });
  });
});

module.exports = router;
