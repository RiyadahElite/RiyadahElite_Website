import express from 'express';
import authController from '../controllers/auth.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);
router.post('/host-login', authController.hostLogin);
router.post('/moderator-login', authController.moderatorLogin);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.get('/dashboard', authMiddleware, authController.getDashboardData);

export default router;