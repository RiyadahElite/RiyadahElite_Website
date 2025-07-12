import { db } from '../config/database.js';

const tournamentController = {
  // Get all tournaments
  async getAllTournaments(req, res) {
    try {
      const tournaments = await db.getTournaments();
      res.json(tournaments);
    } catch (error) {
      console.error('Get tournaments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get tournament by ID
  async getTournamentById(req, res) {
    try {
      const { id } = req.params;
      const tournament = await db.getTournamentById(id);
      
      if (!tournament) {
        return res.status(404).json({ error: 'Tournament not found' });
      }

      res.json(tournament);
    } catch (error) {
      console.error('Get tournament error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create new tournament (admin only)
  async createTournament(req, res) {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ error: 'Access denied' });
      }

      const {
        title,
        game_name,
        description,
        start_date,
        end_date,
        prize_pool,
        max_participants
      } = req.body;

      // Validate required fields
      if (!title || !game_name || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const tournamentData = {
        title,
        game_name,
        description,
        start_date,
        end_date,
        prize_pool,
        max_participants: max_participants || 100,
        created_by: req.user.userId
      };

      const tournament = await db.createTournament(tournamentData);
      res.status(201).json(tournament);
    } catch (error) {
      console.error('Create tournament error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Join tournament
  async joinTournament(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Check if tournament exists
      const tournament = await db.getTournamentById(id);
      if (!tournament) {
        return res.status(404).json({ error: 'Tournament not found' });
      }

      // Check if tournament is still open for registration
      if (tournament.status !== 'upcoming') {
        return res.status(400).json({ error: 'Tournament registration is closed' });
      }

      // Check if user is already registered
      const existingParticipation = tournament.participants?.find(
        p => p.user_id === userId
      );
      if (existingParticipation) {
        return res.status(400).json({ error: 'Already registered for this tournament' });
      }

      // Join tournament
      const participation = await db.joinTournament(userId, id);
      res.status(201).json(participation);
    } catch (error) {
      console.error('Join tournament error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Leave tournament
  async leaveTournament(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      await db.leaveTournament(userId, id);
      res.json({ message: 'Successfully left tournament' });
    } catch (error) {
      console.error('Leave tournament error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get user's tournaments
  async getUserTournaments(req, res) {
    try {
      const userId = req.user.userId;
      const tournaments = await db.getUserTournaments(userId);
      res.json(tournaments);
    } catch (error) {
      console.error('Get user tournaments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default tournamentController;