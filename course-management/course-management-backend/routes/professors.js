const express = require('express');
const router = express.Router();
const ProfessorController = require('../controllers/ProfessorController'); // Import the controller

// Define routes for professors
router.get('/', ProfessorController.getAll);          // Get all professors
router.get('/:id', ProfessorController.getById);      // Get a professor by ID
router.post('/', ProfessorController.create);         // Create a new professor
router.put('/:id', ProfessorController.update);       // Update an existing professor
router.delete('/:id', ProfessorController.remove);    // Delete a professor

module.exports = router;  // Export the routes to be used in server.js
