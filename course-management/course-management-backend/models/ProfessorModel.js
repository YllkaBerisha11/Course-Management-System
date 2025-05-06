// models/ProfessorModel.js
const db = require('../db');

const ProfessorModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM professors', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM professors WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  create: (data) => {
    const { name, email, specialty, course_id } = data;
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO professors (name, email, specialty, course_id) VALUES (?, ?, ?, ?)',
        [name, email, specialty, course_id || null],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  update: (id, data) => {
    const { name, email, specialty, course_id } = data;
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE professors SET name = ?, email = ?, specialty = ?, course_id = ? WHERE id = ?',
        [name, email, specialty, course_id || null, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM professors WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = ProfessorModel;
