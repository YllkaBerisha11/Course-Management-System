// =========================
// IMPORTIMET
// =========================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const db = require('./db/db');

const paymentRoutes = require('./routes/payments');
const candidatesRoutes = require('./routes/candidates');


// =========================
// KONFIGURIME BAZË
// =========================
const app = express();
const port = 3001;

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// =========================
// REGISTER - Regjistrimi i përdoruesit
// =========================
app.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Email-i është i pavlefshëm.' });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error('Gabim gjatë verifikimit të email-it:', err);
      return res.status(500).send('Gabim gjatë verifikimit të email-it.');
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'Ky email është i regjistruar tashmë.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Gabim gjatë hash-imit të fjalëkalimit:', err);
        return res.status(500).send('Gabim gjatë regjistrimit.');
      }

      const insertQuery = 'INSERT INTO users (name, surname, email, password, role) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [name, surname, email, hashedPassword, 'user'], (err) => {
        if (err) {
          console.error('Gabim gjatë regjistrimit:', err);
          return res.status(500).send('Gabim gjatë regjistrimit.');
        }

        res.status(200).json({ success: true, message: 'Regjistrimi ishte i suksesshëm!' });
      });
    });
  });
});

// =========================
// LOGIN
// =========================
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Gabim gjatë verifikimit të login-it:', err);
      return res.status(500).send('Gabim gjatë verifikimit të login-it.');
    }

    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Gabim gjatë krahasimit të fjalëkalimit:', err);
          return res.status(500).send('Gabim gjatë login-it.');
        }

        if (isMatch) {
          return res.status(200).json({
            success: true,
            message: 'Login i suksesshëm',
            role: user.role,
          });
        } else {
          return res.status(400).json({ success: false, message: 'Email ose fjalëkalim i gabuar!' });
        }
      });
    } else {
      return res.status(400).json({ success: false, message: 'Email ose fjalëkalim i gabuar!' });
    }
  });
});

// =========================
// KONTAKTI - Pranimi i mesazheve nga forma
// =========================
app.post('/api/contact-messages', (req, res) => {
  // Debug: print body
  console.log('→ POST /api/contact-messages called with:', req.body);

  const { name, lastname, email, message } = req.body;

  if (!name || !lastname || !email || !message) {
    return res.status(400).json({ success: false, message: 'Të gjitha fushat janë të detyrueshme.' });
  }

  const sql = 'INSERT INTO contact_us (name, lastname, email, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, lastname, email, message], (err, result) => {
    if (err) {
      console.error('Gabim në databazë:', err);
      return res.status(500).json({ success: false, message: 'Gabim në server.' });
    }
    res.status(201).json({ success: true, message: 'Mesazhi u ruajt me sukses!' });
  });
});

// =========================
// RUTAT E TJERA
// =========================
app.use('/api/payments', paymentRoutes);
app.use('/api/candidates', candidatesRoutes);

// =========================
// STARTIMI I SERVERIT
// =========================
app.listen(port, () => {
  console.log(`✅ Serveri po dëgjon në portin ${port}`);
});
