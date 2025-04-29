const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure that your database connection is properly exported from your database file.

// CREATE - Add a new professor
router.post('/', (req, res) => {
    const { name, email, specialty, course_id } = req.body;
    if (!name || !email) {
        return res.status(400).send('Missing required fields');
    }

    db.query(
        'INSERT INTO professors (name, email, specialty, course_id) VALUES (?, ?, ?, ?)',
        [name, email, specialty, course_id || null],
        (err, result) => {
            if (err) return res.status(500).send('Error adding professor');
            res.status(201).send('Professor added');
        }
    );
});

// READ - Get all professors
router.get('/', (req, res) => {
    db.query('SELECT * FROM professors', (err, result) => {
        if (err) return res.status(500).send('Error fetching professors');
        res.json(result);
    });
});

// UPDATE - Update professor by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, specialty, course_id } = req.body;

    db.query(
        'UPDATE professors SET name = ?, email = ?, specialty = ?, course_id = ? WHERE id = ?',
        [name, email, specialty, course_id || null, id],
        (err, result) => {
            if (err) return res.status(500).send('Error updating professor');
            if (result.affectedRows === 0) return res.status(404).send('Professor not found');
            res.send('Professor updated');
        }
    );
});

// DELETE - Delete professor by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM professors WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send('Error deleting professor');
        if (result.affectedRows === 0) return res.status(404).send('Professor not found');
        res.send('Professor deleted');
    });
});

module.exports = router;
