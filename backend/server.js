// server.js
import express from 'express';
import workoutRoutes from './src/routes/workoutRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend draait!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});