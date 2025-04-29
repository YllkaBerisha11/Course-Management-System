import express from 'express';
import { getAllCourseTypes, createCourseType, updateCourseType, deleteCourseType } from '../controllers/courseTypesController.js';

const router = express.Router();

// Routes
router.get('/', getAllCourseTypes);
router.post('/', createCourseType);
router.put('/:id', updateCourseType);
router.delete('/:id', deleteCourseType);

export default router;
