import { db } from '../config/database.js';

const gameController = {
  // Get all games
  async getAllGames(req, res) {
    try {
      const games = await db.getGames();
      res.json(games);
    } catch (error) {
      console.error('Get games error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Submit new game
  async submitGame(req, res) {
    try {
      const {
        title,
        developer,
        genre,
        description,
        image_url
      } = req.body;

      // Validate required fields
      if (!title || !developer || !genre) {
        return res.status(400).json({ error: 'Title, developer, and genre are required' });
      }

      const gameData = {
        title,
        developer,
        genre,
        description,
        image_url,
        submitted_by: req.user.userId,
        status: 'pending'
      };

      const game = await db.createGame(gameData);
      res.status(201).json(game);
    } catch (error) {
      console.error('Submit game error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update game status (admin only)
  async updateGameStatus(req, res) {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ error: 'Access denied' });
      }

      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const validStatuses = ['pending', 'approved', 'testing', 'completed', 'rejected'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const updatedGame = await db.updateGame(id, { 
        status,
        updated_at: new Date().toISOString()
      });

      res.json(updatedGame);
    } catch (error) {
      console.error('Update game status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default gameController;