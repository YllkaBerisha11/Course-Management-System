const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all professors
router.get('/', (req, res) => {
  db.query('SELECT * FROM professors', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST new professor
router.post('/', (req, res) => {
  const { name, email, subject, title, phone, office, image } = req.body;

  const safeTitle = title?.trim() || '';
  const safePhone = phone?.trim() || '';
  const safeOffice = office?.trim() || '';
  const safeImage = image?.trim() || 'https://randomuser.me/api/portraits/men/1.jpg';

  if (!name || !email || !subject) {
    return res.status(400).json({ error: 'Name, email and subject are required.' });
  }

  db.query(
    `INSERT INTO professors (NAME, email, SUBJECT, title, phone, office, image) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, subject, safeTitle, safePhone, safeOffice, safeImage],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.insertId,
        name,
        email,
        subject,
        title: safeTitle,
        phone: safePhone,
        office: safeOffice,
        image: safeImage,
      });
    }
  );
});

// PUT update professor by id
router.put('/:id', (req, res) => {
  const { name, email, subject, title, phone, office, image } = req.body;

  const safeTitle = title?.trim() || '';
  const safePhone = phone?.trim() || '';
  const safeOffice = office?.trim() || '';
  const safeImage = image?.trim() || 'https://randomuser.me/api/portraits/men/1.jpg';

  if (!name || !email || !subject) {
    return res.status(400).json({ error: 'Name, email and subject are required.' });
  }

  db.query(
    `UPDATE professors 
     SET NAME = ?, email = ?, SUBJECT = ?, title = ?, phone = ?, office = ?, image = ? 
     WHERE id = ?`,
    [name, email, subject, safeTitle, safePhone, safeOffice, safeImage, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated' });
    }
  );
});

// DELETE professor by id
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM professors WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
