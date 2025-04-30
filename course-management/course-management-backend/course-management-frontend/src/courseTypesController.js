import db from '../db.js'; // Lidhja me databaze

export const getAllCourseTypes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM course_types');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCourseType = async (req, res) => {
    const { name, course_id } = req.body;
    try {
        await db.query('INSERT INTO course_types (name, course_id) VALUES (?, ?)', [name, course_id]);
        res.status(201).json({ message: 'Course type created' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCourseType = async (req, res) => {
    const { id } = req.params;
    const { name, course_id } = req.body;
    try {
        await db.query('UPDATE course_types SET name = ?, course_id = ? WHERE id = ?', [name, course_id, id]);
        res.json({ message: 'Course type updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCourseType = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM course_types WHERE id = ?', [id]);
        res.json({ message: 'Course type deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
