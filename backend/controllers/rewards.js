import { validationResult } from 'express-validator';
import pool from '../config/db.js';

export const getAllRewards = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM rewards ORDER BY points ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get rewards error:', error);
    next(error);
  }
};

export const getRewardById = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM rewards WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get reward error:', error);
    next(error);
  }
};

export const createReward = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, points } = req.body;

    const result = await pool.query(
      'INSERT INTO rewards (title, description, points) VALUES ($1, $2, $3) RETURNING *',
      [title, description, points]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create reward error:', error);
    next(error);
  }
};

export const updateReward = async (req, res, next) => {
  try {
    const { title, description, points } = req.body;

    const result = await pool.query(
      `UPDATE rewards 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           points = COALESCE($3, points),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title, description, points, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update reward error:', error);
    next(error);
  }
};

export const deleteReward = async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM rewards WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    res.json({ message: 'Reward deleted successfully' });
  } catch (error) {
    console.error('Delete reward error:', error);
    next(error);
  }
};

export const claimReward = async (req, res, next) => {
  try {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Get user's points
      const userPoints = await client.query(
        'SELECT points FROM users WHERE id = $1',
        [req.user.id]
      );

      if (userPoints.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'User not found' });
      }

      // Get reward details
      const reward = await client.query(
        'SELECT * FROM rewards WHERE id = $1',
        [req.params.id]
      );

      if (reward.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Reward not found' });
      }

      if (userPoints.rows[0].points < reward.rows[0].points) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Insufficient points' });
      }

      // Deduct points and record claim
      await client.query(
        'UPDATE users SET points = points - $1 WHERE id = $2',
        [reward.rows[0].points, req.user.id]
      );

      await client.query(
        'INSERT INTO reward_claims (user_id, reward_id) VALUES ($1, $2)',
        [req.user.id, req.params.id]
      );

      await client.query('COMMIT');

      res.json({ message: 'Reward claimed successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Claim reward error:', error);
    next(error);
  }
};