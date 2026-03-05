// src/models/Workout.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema = regels voor workout
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
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