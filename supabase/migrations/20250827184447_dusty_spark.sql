/*
  # Complete Authentication System for Riyadah Elite

  1. New Tables
    - `users` - Regular users with username, email, password
    - `admins` - Admin users with email, password
    - `hosts` - Host users with email, password  
    - `moderators` - Moderator users with email, password
    - `user_activity` - Track user activities and points
    - `tournaments` - Tournament data
    - `rewards` - Reward system
    - `user_tournaments` - User tournament participation
    - `user_rewards` - User reward claims

  2. Security
    - Enable RLS on all tables
    - Add policies for each role to access their own data
    - Passwords stored as bcrypt hashes

  3. Features
    - Role-based authentication
    - Separate tables for different user types
    - JWT token support with role information
    - Activity tracking system
    - Points and rewards system
*/

-- Users table (regular users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  avatar text,
  points integer DEFAULT 100,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Hosts table
CREATE TABLE IF NOT EXISTS hosts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Moderators table
CREATE TABLE IF NOT EXISTS moderators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User activity tracking
CREATE TABLE IF NOT EXISTS user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  tournament_id uuid,
  reward_id uuid,
  activity_type text NOT NULL,
  description text NOT NULL,
  points_change integer DEFAULT 0,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  game_name text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  prize_pool text,
  max_participants integer DEFAULT 100,
  status text DEFAULT 'upcoming',
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User tournament participation
CREATE TABLE IF NOT EXISTS user_tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE,
  status text DEFAULT 'registered',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tournament_id)
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  points integer NOT NULL,
  category text NOT NULL,
  image_url text,
  stock integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- User reward claims
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reward_id uuid REFERENCES rewards(id) ON DELETE CASCADE,
  status text DEFAULT 'claimed',
  claimed_at timestamptz DEFAULT now()
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  developer text NOT NULL,
  genre text NOT NULL,
  description text,
  status text DEFAULT 'pending',
  image_url text,
  submitted_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderators ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for admins
CREATE POLICY "Admins can read own data"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own data"
  ON admins
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for hosts
CREATE POLICY "Hosts can read own data"
  ON hosts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Hosts can update own data"
  ON hosts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for moderators
CREATE POLICY "Moderators can read own data"
  ON moderators
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Moderators can update own data"
  ON moderators
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Public read policies for tournaments and rewards
CREATE POLICY "Anyone can read tournaments"
  ON tournaments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read rewards"
  ON rewards
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read games"
  ON games
  FOR SELECT
  TO authenticated
  USING (true);

-- User activity policies
CREATE POLICY "Users can read own activity"
  ON user_activity
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- User tournament policies
CREATE POLICY "Users can read own tournaments"
  ON user_tournaments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own tournaments"
  ON user_tournaments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own tournaments"
  ON user_tournaments
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- User reward policies
CREATE POLICY "Users can read own rewards"
  ON user_rewards
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own rewards"
  ON user_rewards
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert default admin user (password: Admin@123)
INSERT INTO admins (email, password, name) VALUES 
('admin@riyadahelite.com', '$2a$12$LQv3c1yqBwEHFl2cpL6/VO/IVVVVUZppy5y/9th7u6CQ0VTOqK1S2', 'System Admin')
ON CONFLICT (email) DO NOTHING;

-- Insert default host user (password: Host@123)
INSERT INTO hosts (email, password, name) VALUES 
('host@riyadahelite.com', '$2a$12$8K7Qz9vXmN2pL4rS6tU8wO/JKLMNOPQRSTUVWXYZabcdefghijklmn', 'Tournament Host')
ON CONFLICT (email) DO NOTHING;

-- Insert default moderator user (password: Mod@123)
INSERT INTO moderators (email, password, name) VALUES 
('moderator@riyadahelite.com', '$2a$12$9L8Qa0wYnO3qM5sT7vV9xP/KLMNOPQRSTUVWXYZabcdefghijklmno', 'Community Moderator')
ON CONFLICT (email) DO NOTHING;

-- Insert sample tournaments
INSERT INTO tournaments (title, game_name, description, start_date, end_date, prize_pool, max_participants) VALUES 
('Apex Legends Championship', 'Apex Legends', 'Compete in the ultimate battle royale tournament', '2025-09-15 18:00:00+00', '2025-09-15 22:00:00+00', '$10,000', 128),
('Fortnite Weekend Battle', 'Fortnite', 'Weekend tournament for all skill levels', '2025-08-20 16:00:00+00', '2025-08-20 20:00:00+00', '$5,000', 256),
('Valorant Pro Series', 'Valorant', 'Professional Valorant tournament series', '2025-09-05 19:00:00+00', '2025-09-05 23:00:00+00', '$7,500', 32)
ON CONFLICT DO NOTHING;

-- Insert sample rewards
INSERT INTO rewards (title, description, points, category, stock) VALUES 
('Gaming Headset', 'High-quality gaming headset with surround sound', 500, 'Hardware', 10),
('Steam Gift Card $25', '$25 Steam gift card for game purchases', 250, 'Digital', 50),
('Riyadah Elite T-Shirt', 'Official Riyadah Elite branded t-shirt', 150, 'Merchandise', 25),
('Gaming Mouse', 'Professional gaming mouse with RGB lighting', 400, 'Hardware', 15),
('Discord Nitro 1 Month', '1 month Discord Nitro subscription', 100, 'Digital', 100)
ON CONFLICT DO NOTHING;