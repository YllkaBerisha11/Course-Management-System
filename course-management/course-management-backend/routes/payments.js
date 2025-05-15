const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Krijo lidhjen me databazën (përshtat sipas të dhënave tuaja)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'course'
});

// GET - Merr të gjitha pagesat
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Gabim në server');
  }
});

// POST - Shto pagesë të re
router.post('/', async (req, res) => {
  const {
    candidate_id,
    course_id,
    payment_amount,
    payment_method,
    payment_status
  } = req.body;

  if (
    !candidate_id ||
    !course_id ||
    !payment_amount ||
    !payment_method
  ) {
    return res.status(400).json({ message: 'Të dhënat nuk janë plotësisht të sakta' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO payments (candidate_id, course_id, payment_amount, payment_method, payment_status)
       VALUES (?, ?, ?, ?, ?)`,
      [candidate_id, course_id, payment_amount, payment_method, payment_status || 'pending']
    );

    // Kthe të dhënat e reja me id-në e gjeneruar nga databaza
    const [newPaymentRows] = await pool.query('SELECT * FROM payments WHERE id = ?', [result.insertId]);

    res.status(201).json(newPaymentRows[0]);
  } catch (err) {
    console.error('Gabim gjatë insertimit në DB:', err);
    res.status(500).json({ message: 'Gabim në server gjatë shtimit të pagesës' });
  }
});

module.exports = router;
