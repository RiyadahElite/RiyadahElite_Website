import { db } from '../config/database.js';

const rewardController = {
  // Get all rewards
  async getAllRewards(req, res) {
    try {
      const rewards = await db.getRewards();
      res.json(rewards);
    } catch (error) {
      console.error('Get rewards error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Claim reward
  async claimReward(req, res) {
    try {
      const { rewardId } = req.body;
      const userId = req.user.userId;

      if (!rewardId) {
        return res.status(400).json({ error: 'Reward ID is required' });
      }

      const claimedReward = await db.claimReward(userId, rewardId);
      res.status(201).json({
        message: 'Reward claimed successfully',
        reward: claimedReward
      });
    } catch (error) {
      console.error('Claim reward error:', error);
      
      if (error.message === 'Insufficient points') {
        return res.status(400).json({ error: 'Insufficient points' });
      }
      
      if (error.message === 'Reward out of stock') {
        return res.status(400).json({ error: 'Reward out of stock' });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get user's claimed rewards
  async getUserRewards(req, res) {
    try {
      const userId = req.user.userId;
      const rewards = await db.getUserRewards(userId);
      res.json(rewards);
    } catch (error) {
      console.error('Get user rewards error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default rewardController;