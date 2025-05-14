const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const db = require('./db/db');  // Importo lidhjen nga db.js

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());  // Për të lejuar marrjen e JSON nga kërkesat

// Krijo endpoint për regjistrimin
app.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;

  // Verifikimi nëse email-i është valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Email-i është i pavlefshëm.' });
  }

  // Verifikimi nëse ekziston një përdorues me këtë email
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error('Gabim gjatë verifikimit të email-it:', err);
      return res.status(500).send('Gabim gjatë verifikimit të email-it.');
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'Ky email është i regjistruar tashmë.' });
    }

    // Hash fjalëkalimin për ta ruajtur në siguri
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Gabim gjatë hash-imit të fjalëkalimit:', err);
        return res.status(500).send('Gabim gjatë regjistrimit.');
      }

      // Regjistro përdoruesin në databazë me fjalëkalimin e hash-uar
      const insertQuery = 'INSERT INTO users (name, surname, email, password, role) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [name, surname, email, hashedPassword, 'user'], (err, result) => {
        if (err) {
          console.error('Gabim gjatë regjistrimit:', err);
          return res.status(500).send('Gabim gjatë regjistrimit.');
        }

        res.status(200).json({ success: true, message: 'Regjistrimi ishte i suksesshëm!' });
      });
    });
  });
});

// Krijo endpoint për login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Kontrollo nëse përdoruesi ekziston në databazë
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Gabim gjatë verifikimit të login-it:', err);
      return res.status(500).send('Gabim gjatë verifikimit të login-it.');
    }

    if (result.length > 0) {
      const user = result[0];

      // Krahaso fjalëkalimin e dërguar me fjalëkalimin e hash-uar në databazë
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Gabim gjatë krahasimit të fjalëkalimit:', err);
          return res.status(500).send('Gabim gjatë login-it.');
        }

        if (isMatch) {
          return res.status(200).json({
            success: true,
            message: 'Login i suksesshëm',
            role: user.role,  // Dërgo rolin e përdoruesit (p.sh., "admin" ose "user")
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

// Dëgjo në portin 3001
app.listen(port, () => {
  console.log(`Serveri po dëgjon në portin ${port}`);
});
