const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Marr të gjitha pagesat
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    console.error('Gabim GET /payments:', err);
    res.status(500).json({ error: 'Gabim në server' });
  }
});

// Shto pagesë të re
router.post('/', async (req, res) => {
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;

  console.log('POST /payments me të dhënat:', req.body);

  if (!candidate_id || !course_id || !payment_amount || !payment_method || !payment_status) {
    return res.status(400).json({ error: 'Të gjitha fushat janë të detyrueshme.' });
  }

  try {
    await db.promise().execute(
      `INSERT INTO payments (candidate_id, course_id, payment_amount, payment_method, payment_status) 
       VALUES (?, ?, ?, ?, ?)`,
      [candidate_id, course_id, payment_amount, payment_method, payment_status]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Gabim POST /payments:', err);
    res.status(500).json({ error: 'Gabim gjatë shtimit të pagesës', details: err.message });
  }
});

// Përditëso pagesën me id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { candidate_id, course_id, payment_amount, payment_method, payment_status } = req.body;

  if (!candidate_id || !course_id || !payment_amount || !payment_method || !payment_status) {
    return res.status(400).json({ error: 'Të gjitha fushat janë të detyrueshme.' });
  }

  try {
    await db.promise().execute(
      `UPDATE payments SET candidate_id = ?, course_id = ?, payment_amount = ?, payment_method = ?, payment_status = ? WHERE id = ?`,
      [candidate_id, course_id, payment_amount, payment_method, payment_status, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Gabim PUT /payments/:id:', err);
    res.status(500).json({ error: 'Gabim gjatë përditësimit të pagesës', details: err.message });
  }
});

// Fshi pagesën me id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().execute(`DELETE FROM payments WHERE id = ?`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Gabim DELETE /payments/:id:', err);
    res.status(500).json({ error: 'Gabim gjatë fshirjes së pagesës', details: err.message });
  }
});

module.exports = router;
