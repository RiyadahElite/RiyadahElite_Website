import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'riyadah_elite_fallback_secret';

// Basic authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(500).json({ error: 'Token verification failed' });
  }
};

// Role-based access control middleware
const requireRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // First check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { userId, role } = req.user;

      // Check if user's role is in allowed roles
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      // Verify user still exists in database
      try {
        let user = null;
        switch (role) {
          case 'user':
            user = await db.getUserById(userId);
            break;
          case 'admin':
            user = await db.getAdminById(userId);
            break;
          case 'host':
            user = await db.getHostById(userId);
            break;
          case 'moderator':
            user = await db.getModeratorById(userId);
            break;
        }
        
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        req.currentUser = user;
      } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(401).json({ error: 'User verification failed' });
      }

      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      return res.status(500).json({ error: 'Authorization check failed' });
    }
  };
};

// Specific role middlewares
const requireUser = requireRole(['user']);
const requireAdmin = requireRole(['admin']);
const requireHost = requireRole(['host']);
const requireModerator = requireRole(['moderator']);
const requireAdminOrModerator = requireRole(['admin', 'moderator']);
const requireAdminOrHost = requireRole(['admin', 'host']);
const requireStaff = requireRole(['admin', 'moderator', 'host']);

export { 
  authMiddleware, 
  requireRole,
  requireUser,
  requireAdmin,
  requireHost,
  requireModerator,
  requireAdminOrModerator,
  requireAdminOrHost,
  requireStaff
};