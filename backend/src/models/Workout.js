// src/models/Workout.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema = regels voor workout
const workoutSchema = new Schema({
  title: {
    type: String,
     required: true,
    trim: true,        // Verwijdert spaties
    maxlength: 100     // Max 100 tekens
  },
  reps: {
    type: Number,
    required: true,
    min: 1             // Min 1 (geen 0 of negatief)
  },
  load: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Model = object voor maken/ophalen/aanpassen/verwijderen
const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;