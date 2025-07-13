import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Configure environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import tournamentRoutes from './routes/tournaments.js';
import rewardRoutes from './routes/rewards.js';
import gameRoutes from './routes/games.js';

// Import database
import { db } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression());
app.use(morgan('combined'));

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Riyadh Elite Backend is running',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      tournaments: '/api/tournaments',
      rewards: '/api/rewards',
      games: '/api/games'
    }
  });
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    let dbStatus = 'disconnected';
    try {
      await db.testConnection();
      dbStatus = 'connected';
    } catch (error) {
      console.warn('Database connection test failed:', error.message);
    }
    
    res.json({
      status: 'healthy',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.json({
      status: 'healthy',
      database: 'disconnected',
      message: 'Server running in development mode',
      timestamp: new Date().toISOString()
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/games', gameRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'GET /api/tournaments',
      'GET /api/rewards'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Riyadh Elite Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  
  if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'https://your-project.supabase.co') {
    console.warn('⚠️  Supabase credentials not configured. Using mock mode.');
    console.warn('   To enable full functionality, update .env with your Supabase credentials');
  }
});

export default app;