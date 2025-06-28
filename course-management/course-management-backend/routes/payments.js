const express = require('express');
const router = express.Router();
const db = require('../db'); // Lidhja me DB (p.sh MySQL)

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Gabim në server' });
  }
});

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
    res.status(500).json({ error: 'Gabim gjatë shtimit të pagesës' });
  }
});

module.exports = router;
