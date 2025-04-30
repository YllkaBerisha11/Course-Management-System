const db = require('../db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM kandidatet', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM kandidatet WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { emri, mbiemri, email, telefoni, data_lindjes } = req.body;
  db.query(
    'INSERT INTO kandidatet (emri, mbiemri, email, telefoni, data_lindjes) VALUES (?, ?, ?, ?, ?)',
    [emri, mbiemri, email, telefoni, data_lindjes],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.update = (req, res) => {
  const { emri, mbiemri, email, telefoni, data_lindjes } = req.body;
  db.query(
    'UPDATE kandidatet SET emri = ?, mbiemri = ?, email = ?, telefoni = ?, data_lindjes = ? WHERE id = ?',
    [emri, mbiemri, email, telefoni, data_lindjes, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Përditësimi u bë me sukses' });
    }
  );
};

exports.delete = (req, res) => {
  db.query('DELETE FROM kandidatet WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Kandidati u fshi me sukses' });
  });
};
