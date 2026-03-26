// server.js
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import workoutRoutes from './src/routes/workoutRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS toestaan voor frontend
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// Verbind met MongoDB en start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');
    
    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });