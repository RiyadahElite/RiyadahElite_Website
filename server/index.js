import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import tournamentRoutes from './routes/tournaments.js';
import rewardRoutes from './routes/rewards.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SSL certificate options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'config', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'config', 'cert.pem'))
};

// Initialize database
initializeDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/api', tournamentRoutes);
app.use('/api', rewardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server running on port ${port} (HTTPS)`);
});