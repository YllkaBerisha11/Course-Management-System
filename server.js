const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'course_management'
});

// Ruter për regjistrim të përdoruesve
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).send('Error registering user');
        res.status(201).send('User registered');
    });
});

// Ruter për login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (err || result.length === 0) return res.status(400).send('User not found');

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Ruter për listimin e produkteve
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) return res.status(500).send('Error fetching products');
        res.json(result);
    });
});

app.listen(5000, () => console.log('Server started on port 5000'));
