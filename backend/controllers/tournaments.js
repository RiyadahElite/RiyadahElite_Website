import { validationResult } from 'express-validator';
import pool from '../config/db.js';

export const getAllTournaments = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tournaments ORDER BY start_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get tournaments error:', error);
    next(error);
  }
};

export const getTournamentById = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tournaments WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get tournament error:', error);
    next(error);
  }
};

export const createTournament = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, startDate, prizePool } = req.body;

    const result = await pool.query(
      'INSERT INTO tournaments (title, description, start_date, prize_pool, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, startDate, prizePool, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create tournament error:', error);
    next(error);
  }
};

export const updateTournament = async (req, res, next) => {
  try {
    const { title, description, startDate, prizePool, status } = req.body;

    const result = await pool.query(
      `UPDATE tournaments 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           start_date = COALESCE($3, start_date),
           prize_pool = COALESCE($4, prize_pool),
           status = COALESCE($5, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [title, description, startDate, prizePool, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update tournament error:', error);
    next(error);
  }
};

export const deleteTournament = async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM tournaments WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    console.error('Delete tournament error:', error);
    next(error);
  }
};