// src/routes/workoutRoutes.js
import express from 'express';

// Maak router
const router = express.Router();

// GET alle workouts
router.get('/', (req, res) => {
  res.json({ message: 'GET alle workouts' });
});

// GET één workout
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `GET workout ${id}` });
});

// POST nieuwe workout
router.post('/', (req, res) => {
  res.json({ message: 'POST workout', data: req.body });
});

// PATCH workout
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `PATCH workout ${id}` });
});

// DELETE workout
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `DELETE workout ${id}` });
});

// Exporteer router
export default router;