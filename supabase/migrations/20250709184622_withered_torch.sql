/*
  # Complete Riyadah Elite Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `email` (text, unique)
      - `password` (text, hashed)
      - `role` (text, default 'user')
      - `avatar` (text, optional)
      - `points` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `tournaments`
      - `id` (uuid, primary key)
      - `title` (text)
      - `game_name` (text)
      - `description` (text)
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `prize_pool` (text)
      - `max_participants` (integer)
      - `status` (text, default 'upcoming')
      - `created_by` (uuid, foreign key to users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `rewards`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `points_required` (integer)
      - `category` (text)
      - `image_url` (text, optional)
      - `stock` (integer, default 0)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `user_participation`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `tournament_id` (uuid, foreign key to tournaments)
      - `status` (text, default 'registered')
      - `joined_at` (timestamp)
      - `updated_at` (timestamp)

    - `user_rewards`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `reward_id` (uuid, foreign key to rewards)
      - `status` (text, default 'claimed')
      - `redeemed_at` (timestamp)

    - `games`
      - `id` (uuid, primary key)
      - `title` (text)
      - `developer` (text)
      - `genre` (text)
      - `description` (text)
      - `status` (text, default 'pending')
      - `image_url` (text, optional)
      - `submitted_by` (uuid, foreign key to users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add admin policies for management operations

  3. Indexes
    - Add indexes for frequently queried columns
    - Add composite indexes for join operations
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  avatar text,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  game_name text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  prize_pool text,
  max_participants integer DEFAULT 100,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  created_by uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  points_required integer NOT NULL,
  category text DEFAULT 'general',
  image_url text,
  stock integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_participation table
CREATE TABLE IF NOT EXISTS user_participation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE,
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'active', 'completed', 'disqualified')),
  joined_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tournament_id)
);

-- Create user_rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reward_id uuid REFERENCES rewards(id) ON DELETE CASCADE,
  status text DEFAULT 'claimed' CHECK (status IN ('claimed', 'shipped', 'delivered')),
  redeemed_at timestamptz DEFAULT now()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  developer text NOT NULL,
  genre text NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'testing', 'completed', 'rejected')),
  image_url text,
  submitted_by uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_participation ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read public user info" ON users
  FOR SELECT TO authenticated
  USING (true);

-- Tournaments policies
CREATE POLICY "Anyone can read tournaments" ON tournaments
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage tournaments" ON tournaments
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'moderator')
    )
  );

-- Rewards policies
CREATE POLICY "Anyone can read active rewards" ON rewards
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage rewards" ON rewards
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'moderator')
    )
  );

-- User participation policies
CREATE POLICY "Users can read own participation" ON user_participation
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own participation" ON user_participation
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- User rewards policies
CREATE POLICY "Users can read own rewards" ON user_rewards
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can claim rewards" ON user_rewards
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Games policies
CREATE POLICY "Anyone can read approved games" ON games
  FOR SELECT TO authenticated
  USING (status IN ('approved', 'testing', 'completed'));

CREATE POLICY "Users can submit games" ON games
  FOR INSERT TO authenticated
  WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "Users can read own submissions" ON games
  FOR SELECT TO authenticated
  USING (submitted_by = auth.uid());

CREATE POLICY "Admins can manage games" ON games
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'moderator')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournaments_start_date ON tournaments(start_date);
CREATE INDEX IF NOT EXISTS idx_user_participation_user_id ON user_participation(user_id);
CREATE INDEX IF NOT EXISTS idx_user_participation_tournament_id ON user_participation(tournament_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_submitted_by ON games(submitted_by);

-- Insert sample data
INSERT INTO rewards (title, description, points_required, category, stock) VALUES
  ('Gaming Mouse', 'High-precision gaming mouse', 500, 'hardware', 10),
  ('Mechanical Keyboard', 'RGB mechanical gaming keyboard', 800, 'hardware', 5),
  ('Game Key - Steam', 'Random Steam game key', 200, 'games', 50),
  ('Riyadah Elite T-Shirt', 'Official merchandise t-shirt', 300, 'merchandise', 20),
  ('Gaming Headset', 'Professional gaming headset', 600, 'hardware', 8);

INSERT INTO tournaments (title, game_name, description, start_date, end_date, prize_pool, max_participants, created_by) VALUES
  ('Apex Legends Championship', 'Apex Legends', 'Competitive tournament for Apex Legends players', '2025-02-15 18:00:00', '2025-02-15 22:00:00', '$10,000', 128, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
  ('Fortnite Weekend Battle', 'Fortnite', 'Weekend tournament for Fortnite enthusiasts', '2025-02-20 16:00:00', '2025-02-20 20:00:00', '$5,000', 256, (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
  ('Valorant Pro Series', 'Valorant', 'Professional Valorant tournament series', '2025-03-05 19:00:00', '2025-03-05 23:00:00', '$7,500', 32, (SELECT id FROM users WHERE role = 'admin' LIMIT 1));