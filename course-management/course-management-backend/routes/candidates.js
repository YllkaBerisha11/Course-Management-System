const express = require('express');
const router = express.Router();
const db = require('../db/db');

// SHTO kandidat
router.post('/', async (req, res) => {
  const { NAME, email, phone, course_id } = req.body;
  const sql = 'INSERT INTO candidates (NAME, email, phone, course_id) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await db.promise().query(sql, [NAME, email, phone, course_id]);
    res.status(201).json({ message: 'Kandidati u shtua me sukses', id: result.insertId });
  } catch (err) {
    console.error('Gabim gjatë shtimit të kandidatit:', err);
    res.status(500).json({ error: 'Nuk u shtua kandidati. Provo përsëri.' });
  }
});

// MERR kandidatët
router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM candidates';

  try {
    const [results] = await db.promise().query(sql);
    res.status(200).json(results);
  } catch (err) {
    console.error('Gabim gjatë marrjes së kandidatëve:', err);
    res.status(500).json({ error: 'Nuk mund të lexohen kandidatët.' });
  }
});

// PËRDITËSO kandidat
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { NAME, email, phone, course_id } = req.body;
  const sql = 'UPDATE candidates SET NAME = ?, email = ?, phone = ?, course_id = ? WHERE id = ?';

  try {
    await db.promise().query(sql, [NAME, email, phone, course_id, id]);
    res.status(200).json({ message: 'Kandidati u përditësua me sukses' });
  } catch (err) {
    console.error('Gabim gjatë përditësimit të kandidatit:', err);
    res.status(500).json({ error: 'Nuk u përditësua kandidati.' });
  }
});

// FSHIJ kandidat
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM candidates WHERE id = ?';

  try {
    await db.promise().query(sql, [id]);
    res.status(200).json({ message: 'Kandidati u fshi me sukses' });
  } catch (err) {
    console.error('Gabim gjatë fshirjes së kandidatit:', err);
    res.status(500).json({ error: 'Nuk u fshi kandidati.' });
  }
});

module.exports = router;
