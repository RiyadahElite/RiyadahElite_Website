/*
  # Authentication Schema for Riyadh Elite
  
  1. New Tables
    - `users` - User accounts with authentication
    - `user_activity` - Activity tracking
    - `tournaments` - Tournament management
    - `rewards` - Reward system
    - `user_tournaments` - Tournament participation
    - `user_rewards` - Reward claims
    
  2. Security
    - Enable RLS on all tables
    - Add proper authentication policies
    
  3. Default Data
    - Create default admin account
    - Sample tournaments and rewards
*/

-- Create users table with proper authentication fields
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  avatar text DEFAULT 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
  points integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  game text NOT NULL,
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

-- Create user_tournaments table for participation tracking
CREATE TABLE IF NOT EXISTS user_tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE,
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'active', 'completed', 'disqualified')),
  joined_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tournament_id)
);

-- Create user_rewards table for reward claims
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reward_id uuid REFERENCES rewards(id) ON DELETE CASCADE,
  status text DEFAULT 'claimed' CHECK (status IN ('claimed', 'shipped', 'delivered')),
  redeemed_at timestamptz DEFAULT now()
);

-- Create user_activity table for activity tracking
CREATE TABLE IF NOT EXISTS user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  tournament_id uuid REFERENCES tournaments(id) ON DELETE SET NULL,
  reward_id uuid REFERENCES rewards(id) ON DELETE SET NULL,
  activity_type text NOT NULL CHECK (activity_type IN ('registration', 'login', 'tournament_join', 'tournament_leave', 'reward_claim', 'points_earned', 'profile_update')),
  description text,
  points_change integer DEFAULT 0,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public user info readable" ON users
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

-- User tournaments policies
CREATE POLICY "Users can read own tournaments" ON user_tournaments
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own tournaments" ON user_tournaments
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- User rewards policies
CREATE POLICY "Users can read own rewards" ON user_rewards
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can claim rewards" ON user_rewards
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- User activity policies
CREATE POLICY "Users can read own activity" ON user_activity
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can log activity" ON user_activity
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_user_tournaments_user_id ON user_tournaments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);

-- Insert default admin account (password: Admin@123 hashed with bcrypt)
INSERT INTO users (username, email, password, role, points) VALUES
  ('Admin', 'admin@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 1000)
ON CONFLICT (email) DO NOTHING;

-- Insert sample tournaments
INSERT INTO tournaments (title, game, description, start_date, end_date, prize_pool, created_by) VALUES
  ('Apex Legends Championship', 'Apex Legends', 'Competitive tournament for Apex Legends players', '2025-02-15 18:00:00', '2025-02-15 22:00:00', '$10,000', (SELECT id FROM users WHERE email = 'admin@gmail.com')),
  ('Fortnite Weekend Battle', 'Fortnite', 'Weekend tournament for Fortnite enthusiasts', '2025-02-20 16:00:00', '2025-02-20 20:00:00', '$5,000', (SELECT id FROM users WHERE email = 'admin@gmail.com')),
  ('Valorant Pro Series', 'Valorant', 'Professional Valorant tournament series', '2025-03-05 19:00:00', '2025-03-05 23:00:00', '$7,500', (SELECT id FROM users WHERE email = 'admin@gmail.com'))
ON CONFLICT DO NOTHING;

-- Insert sample rewards
INSERT INTO rewards (title, description, points_required, category, stock) VALUES
  ('Gaming Mouse', 'High-precision gaming mouse', 500, 'hardware', 10),
  ('Mechanical Keyboard', 'RGB mechanical gaming keyboard', 800, 'hardware', 5),
  ('Game Key - Steam', 'Random Steam game key', 200, 'games', 50),
  ('Riyadh Elite T-Shirt', 'Official merchandise t-shirt', 300, 'merchandise', 20),
  ('Gaming Headset', 'Professional gaming headset', 600, 'hardware', 8)
ON CONFLICT DO NOTHING;