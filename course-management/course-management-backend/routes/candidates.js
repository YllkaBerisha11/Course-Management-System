const express = require('express');
const router = express.Router();
const db = require('../db/db');

// =====================
// GET: Get all candidates
// =====================
router.get('/', (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) {
      console.error('❌ Error GET /candidates:', err);
      return res.status(500).json({ error: 'Error fetching candidates.' });
    }
    res.json(results);
  });
});

// =====================
// POST: Add a new candidate
// =====================
router.post('/', (req, res) => {
  const { name, email, phone, course_id } = req.body;
  console.log('📥 Incoming data:', req.body);

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const courseIdParsed = course_id !== '' ? parseInt(course_id) : null;

  const sql = 'INSERT INTO candidates (NAME, email, phone, course_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone || null, courseIdParsed], (err, result) => {
    if (err) {
      console.error('❌ Error POST /candidates:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Error adding candidate.' });
    }

    res.status(201).json({
      id: result.insertId,
      name,
      email,
      phone,
      course_id: courseIdParsed,
    });
  });
});

// =====================
// PUT: Update an existing candidate
// =====================
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone, course_id } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const courseIdParsed = course_id !== '' ? parseInt(course_id) : null;

  const sql = 'UPDATE candidates SET NAME = ?, email = ?, phone = ?, course_id = ? WHERE id = ?';
  db.query(sql, [name, email, phone || null, courseIdParsed, id], (err, result) => {
    if (err) {
      console.error('❌ Error PUT /candidates/:id:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Error updating candidate.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Candidate not found.' });
    }
    res.json({ message: '✅ Candidate updated successfully' });
  });
});

// =====================
// DELETE: Delete a candidate
// =====================
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM candidates WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error DELETE /candidates/:id:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Error deleting candidate.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Candidate not found.' });
    }
    res.json({ message: '🗑️ Candidate deleted successfully' });
  });
});

module.exports = router;
