const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'course'
});

app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).send('Missing fields');

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role],
            (err) => {
                if (err) return res.status(500).send('Error registering user');
                res.status(201).send('User registered');
            }
        );
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (err) return res.status(500).send('Server error');
        if (result.length === 0) return res.status(400).send('User not found');

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Get all products (mund ta ndryshosh për "courses" më vonë)
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) return res.status(500).send('Error fetching products');
        res.json(result);
    });
});

// Run server
app.listen(5000, () => console.log('Server started on http://localhost:5000'));
