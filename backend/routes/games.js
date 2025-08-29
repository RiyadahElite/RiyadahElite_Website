import express from 'express';
import gameController from '../controllers/games.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All game routes require authentication
router.use(authMiddleware);

// Game routes
router.get('/', gameController.getAllGames);
router.post('/', gameController.submitGame);
router.put('/:id/status', gameController.updateGameStatus);

export default router;