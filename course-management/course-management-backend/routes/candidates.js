// routes/candidates.js

const express = require('express');
const router = express.Router();
const db = require('../db/db');


// CREATE: Shtimi i kandidatit
router.post('/', async (req, res) => {
  const { name, email, phone, course_id } = req.body;
  const sql = 'INSERT INTO candidates (name, email, phone, course_id) VALUES (?, ?, ?, ?)';
  
  try {
    const [result] = await db.promise().query(sql, [name, email, phone, course_id]);
    res.status(201).json({ message: 'Kandidati u shtua me sukses', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Marrja e kandidatëve
router.get('/', async (req, res) => {
  const sql = `
    SELECT c.id, c.name, c.email, c.phone, cs.title AS course_title
    FROM candidates c
    LEFT JOIN courses cs ON c.course_id = cs.id
  `;
  
  try {
    const [results] = await db.promise().query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
