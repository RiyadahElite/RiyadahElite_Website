import express from 'express';
import rewardController from '../controllers/rewards.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All reward routes require authentication
router.use(authMiddleware);

// Reward routes
router.get('/', rewardController.getAllRewards);
router.get('/user', rewardController.getUserRewards);
router.post('/claim', rewardController.claimReward);

export default router;