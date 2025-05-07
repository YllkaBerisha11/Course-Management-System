// backend/controllers/candidateController.js
const connection = require('../models/candidateModel');

// Funksioni për të shtuar një kandidat
const addCandidate = (req, res) => {
  const { name, email, phone, course_id } = req.body;
  const query = 'INSERT INTO candidates (name, email, phone, course_id) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, phone, course_id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë shtimit të kandidatit:', err);
      return res.status(500).send('Ka ndodhur një gabim gjatë shtimit të kandidatit.');
    }
    res.status(200).json({ id: result.insertId, name, email, phone, course_id });
  });
};

// Funksioni për të marrë të gjithë kandidatët
const getCandidates = (req, res) => {
  const query = 'SELECT * FROM candidates';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Gabim gjatë marrjes së kandidatëve:', err);
      return res.status(500).send('Gabim gjatë marrjes së kandidatëve.');
    }
    res.status(200).json(result);
  });
};

// Funksioni për të marrë një kandidat me ID
const getCandidateById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM candidates WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë marrjes së kandidatit:', err);
      return res.status(500).send('Ka ndodhur një gabim gjatë marrjes së kandidatit.');
    }
    res.status(200).json(result[0]);
  });
};

// Funksioni për të përditësuar një kandidat
const updateCandidate = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, course_id } = req.body;
  const query = 'UPDATE candidates SET name = ?, email = ?, phone = ?, course_id = ? WHERE id = ?';
  connection.query(query, [name, email, phone, course_id, id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë përditësimit të kandidatit:', err);
      return res.status(500).send('Ka ndodhur një gabim gjatë përditësimit të kandidatit.');
    }
    res.status(200).json({ id, name, email, phone, course_id });
  });
};

// Funksioni për të fshirë një kandidat
const deleteCandidate = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM candidates WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë fshirjes së kandidatit:', err);
      return res.status(500).send('Ka ndodhur një gabim gjatë fshirjes së kandidatit.');
    }
    res.status(200).send(`Kandidati me ID ${id} u fshi me sukses.`);
  });
};

module.exports = {
  addCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
};
