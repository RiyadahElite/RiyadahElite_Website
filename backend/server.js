import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import tournamentRoutes from './routes/tournaments.js';
import rewardRoutes from './routes/rewards.js';
import gameRoutes from './routes/games.js';
import { db } from './config/database.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/games', gameRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ "message": "Riyadah Elite Backend & Database Connected ✅" });
});

// Test database connection
async function testDatabaseConnection() {
  try {
    await db.testConnection();
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  
  // Test database connection
  await testDatabaseConnection();
});

export default app;