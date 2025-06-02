import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../data/riyadah.db');

// Ensure data directory exists
const dataDir = join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db;

// Helper function to run SQL queries with proper error handling
export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Helper function to get single row with error handling
export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Helper function to get multiple rows with error handling
export const getAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export async function initializeDatabase() {
  try {
    // Close existing connection if any
    if (db) {
      await new Promise((resolve, reject) => {
        db.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Create new database connection
    db = new sqlite3.Database(dbPath);
    
    // Enable foreign keys
    await runQuery('PRAGMA foreign_keys = ON');

    // Create tables
    await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS user_points (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        points INTEGER DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS tournaments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS rewards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        points_required INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS claims (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        reward_id INTEGER NOT NULL,
        claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (reward_id) REFERENCES rewards (id)
      )
    `);

    // Create admin user if not exists
    const adminEmail = 'admin@gmail.com';
    const admin = await getOne('SELECT * FROM users WHERE email = ?', [adminEmail]);

    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('Admin@123', salt);

      const result = await runQuery(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `, ['Admin', adminEmail, passwordHash, 'admin']);

      // Initialize admin points
      await runQuery(
        'INSERT INTO user_points (user_id) VALUES (?)',
        [result.lastID]
      );

      console.log('Admin user created successfully');
    }

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

// User-related functions
export async function createUser({ name, email, passwordHash }) {
  const result = await runQuery(`
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?)
  `, [name, email, passwordHash]);

  await runQuery(
    'INSERT INTO user_points (user_id) VALUES (?)',
    [result.lastID]
  );

  return result;
}

export async function getUserByEmail(email) {
  return await getOne('SELECT * FROM users WHERE email = ?', [email]);
}

export async function getUserById(id) {
  return await getOne(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [id]
  );
}

// Tournament-related functions
export async function getAllTournaments() {
  return await getAll('SELECT * FROM tournaments ORDER BY date DESC');
}

export async function createTournament({ title, description, date }) {
  return await runQuery(`
    INSERT INTO tournaments (title, description, date)
    VALUES (?, ?, ?)
  `, [title, description, date]);
}

// Reward-related functions
export async function getAllRewards() {
  return await getAll('SELECT * FROM rewards');
}

export async function claimReward(userId, rewardId) {
  return await runQuery(`
    INSERT INTO claims (user_id, reward_id)
    VALUES (?, ?)
  `, [userId, rewardId]);
}