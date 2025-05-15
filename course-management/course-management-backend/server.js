const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const db = require('./db/db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// ======================= REGISTER =========================
app.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Email-i është i pavlefshëm.' });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).send('Gabim gjatë verifikimit të email-it.');
    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'Ky email është i regjistruar tashmë.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Gabim gjatë regjistrimit.');
      const insertQuery = 'INSERT INTO users (name, surname, email, password, role) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [name, surname, email, hashedPassword, 'user'], (err) => {
        if (err) return res.status(500).send('Gabim gjatë regjistrimit.');
        res.status(200).json({ success: true, message: 'Regjistrimi ishte i suksesshëm!' });
      });
    });
  });
});

// ========================= LOGIN =========================
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) return res.status(500).send('Gabim gjatë login-it.');
    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).send('Gabim gjatë login-it.');
        if (isMatch) {
          return res.status(200).json({
            success: true,
            message: 'Login i suksesshëm',
            role: user.role,
          });
        } else {
          return res.status(400).json({ success: false, message: 'Përdoruesi ose fjalëkalimi është i gabuar!' });
        }
      });
    } else {
      return res.status(400).json({ success: false, message: 'Përdoruesi ose fjalëkalimi është i gabuar!' });
    }
  });
});

// ================ CRUD për Kandidatët ===================

// Merr të gjithë kandidatët
app.get('/candidates', (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) return res.status(500).send('Gabim gjatë marrjes së kandidatëve.');
    res.json(results);
  });
});

// Merr një kandidat sipas ID
app.get('/candidates/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM candidates WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Gabim gjatë marrjes së kandidatit.');
    res.json(result[0]);
  });
});

// Shto një kandidat të ri
// Shto një kandidat të ri
app.post('/candidates', (req, res) => {
  const { name, email, phone, course_id } = req.body;
  const query = 'INSERT INTO candidates (NAME, email, phone, course_id) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, course_id], (err, result) => {
    if (err) {
      console.error('Gabim gjatë shtimit:', err); // debug
      return res.status(500).json({ success: false, message: 'Gabim gjatë shtimit të kandidatit.' });
    }
    res.status(201).json({ success: true, message: 'Kandidati u shtua me sukses!' });
  });
});


// Përditëso një kandidat
app.put('/candidates/:id', (req, res) => {
  const id = req.params.id;
  const { NAME, email, phone, course_id } = req.body;

  const query = 'UPDATE candidates SET NAME = ?, email = ?, phone = ?, course_id = ? WHERE id = ?';
  db.query(query, [NAME, email, phone, course_id, id], (err) => {
    if (err) return res.status(500).send('Gabim gjatë përditësimit të kandidatit.');
    res.json({ success: true, message: 'Kandidati u përditësua me sukses!' });
  });
});

// Fshij një kandidat
app.delete('/candidates/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM candidates WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Gabim gjatë fshirjes së kandidatit.');
    res.json({ success: true, message: 'Kandidati u fshi me sukses!' });
  });
});

// ======================== PORT ===========================
app.listen(port, () => {
  console.log(`Serveri po dëgjon në portin ${port}`);
});
