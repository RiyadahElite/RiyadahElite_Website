const express = require('express');
const rewardController = require('../controllers/rewardController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All reward routes require authentication
router.use(authMiddleware);

// Reward routes
router.get('/', rewardController.getAllRewards);
router.get('/user', rewardController.getUserRewards);
router.post('/claim', rewardController.claimReward);

module.exports = router;