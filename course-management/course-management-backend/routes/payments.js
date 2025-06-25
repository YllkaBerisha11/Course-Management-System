// routes/payments.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Merr të gjitha pagesat
router.get('/', (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gabim në server' });
    }
    res.json(results);
  });
});

// POST - Shto pagesë të re
router.post('/', (req, res) => {
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;

  if (!candidate_id || !course_id || !payment_amount || !payment_method) {
    return res.status(400).json({ message: 'Të dhënat nuk janë plotësisht të sakta' });
  }

  const insertQuery = `INSERT INTO payments (candidate_id, course_id, payment_amount, payment_method, payment_status) VALUES (?, ?, ?, ?, ?)`;
  db.query(insertQuery, [candidate_id, course_id, payment_amount, payment_method, payment_status || 'pending'], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gabim gjatë shtimit të pagesës' });
    }

    db.query('SELECT * FROM payments WHERE id = ?', [result.insertId], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gabim në server' });
      }
      res.status(201).json(rows[0]);
    });
  });
});

// PUT - Modifikim i pagesës ekzistuese
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;

  if (!candidate_id || !course_id || !payment_amount || !payment_method) {
    return res.status(400).json({ message: 'Të dhënat nuk janë plotësisht të sakta' });
  }

  const updateQuery = `
    UPDATE payments
    SET candidate_id = ?, course_id = ?, payment_amount = ?, payment_method = ?, payment_status = ?
    WHERE id = ?
  `;

  db.query(updateQuery, [candidate_id, course_id, payment_amount, payment_method, payment_status || 'pending', id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gabim gjatë modifikimit të pagesës' });
    }
    res.json({ message: 'Pagesa u modifikua me sukses' });
  });
});

// DELETE - Fshirje e pagesës
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM payments WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gabim gjatë fshirjes së pagesës' });
    }
    res.json({ message: 'Pagesa u fshi me sukses' });
  });
});

module.exports = router;
