const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;

  try {
    await db.execute(
      `INSERT INTO payments (candidate_id, course_id, payment_amount, payment_method, payment_status) 
       VALUES (?, ?, ?, ?, ?)`,
      [candidate_id, course_id, payment_amount, payment_method, payment_status]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error while adding the payment' });
  }
});

module.exports = router;
