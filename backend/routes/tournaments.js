import express from 'express';
import tournamentController from '../controllers/tournaments.js';
import { authMiddleware } from '../middleware/auth.js';

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

export default router;