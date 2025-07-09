const express = require('express');
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All game routes require authentication
router.use(authMiddleware);

// Game routes
router.get('/', gameController.getAllGames);
router.post('/', gameController.submitGame);
router.put('/:id/status', gameController.updateGameStatus);

module.exports = router;