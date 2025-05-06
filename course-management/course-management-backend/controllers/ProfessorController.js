// controllers/ProfessorController.js
const ProfessorModel = require('../models/ProfessorModel');

const getAll = async (req, res) => {
  try {
    const data = await ProfessorModel.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await ProfessorModel.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Professor not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await ProfessorModel.create(req.body);
    res.status(201).json({ message: 'Professor created', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const update = async (req, res) => {
  try {
    const result = await ProfessorModel.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Professor not found' });
    }
    res.json({ message: 'Professor updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await ProfessorModel.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Professor not found' });
    }
    res.json({ message: 'Professor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
