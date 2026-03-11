import Workout from '../models/Workout.js';
import mongoose from 'mongoose';

// GET alle workouts
export const getAllWorkouts = async (req, res) => {
  try {
    // 1. Haal alle workouts op
    // 2. Sorteer: nieuwste eerst
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    
    // 3. Stuur terug
    res.status(200).json(workouts);
  } catch (error) {
    // 4. Als fout, stuur error
    res.status(500).json({ error: error.message });
  }
};

// GET één workout op basis van ID
export const getWorkoutById = async (req, res) => {
  // 1. Haal ID uit URL
  const { id } = req.params;

  // 2. Check of ID geldig is (24 tekens, juiste format)
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige workout ID' });
  }

  try {
    // 3. Zoek workout met dit ID
    const workout = await Workout.findById(id);

    // 4. Bestaat niet? Stuur 404
    if (!workout) {
      return res.status(404).json({ error: 'Workout niet gevonden' });
    }

    // 5. Gevonden? Stuur terug!
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST nieuwe workout
export const createWorkout = async (req, res) => {
  // 1. Haal data uit request
  const { title, reps, load } = req.body;

  try {
    // 2. Maak workout in database
    const workout = await Workout.create({ title, reps, load });
    
    // 3. Stuur terug
    res.status(201).json(workout);
  } catch (error) {
    // 4. Validatie fout? (bijv. title vergeten)
    res.status(400).json({ error: error.message });
  }
};

// PATCH workout (aanpassen)
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // Check of ID geldig is
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige workout ID' });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      id, 
      { ...req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout niet gevonden' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE workout (verwijderen)
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // Check of ID geldig is
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige workout ID' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout niet gevonden' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};