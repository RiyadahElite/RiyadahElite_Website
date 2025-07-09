const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All tournament routes require authentication
router.use(authMiddleware);

// Tournament routes
router.get('/', tournamentController.getAllTournaments);
router.get('/user', tournamentController.getUserTournaments);
router.get('/:id', tournamentController.getTournamentById);
router.post('/', tournamentController.createTournament);
router.post('/:id/join', tournamentController.joinTournament);
router.delete('/:id/leave', tournamentController.leaveTournament);

module.exports = router;