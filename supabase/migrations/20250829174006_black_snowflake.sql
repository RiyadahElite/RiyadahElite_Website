/*
  # Enhanced User Management System with RBAC

  1. New Tables
    - `roles` - Define system roles (admin, user, moderator, host, etc.)
    - `user_roles` - Many-to-many relationship between users and roles (RBAC)
    - `user_profiles` - Extended user profile information
    - Updates to existing `users` table structure

  2. Security
    - Enable RLS on all new tables
    - Add comprehensive policies for role-based access
    - Maintain existing authentication flow

  3. Features
    - Role-based access control (RBAC)
    - Extended user profiles with preferences
    - Flexible role assignment system
    - Profile management capabilities
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name text UNIQUE NOT NULL,
  description text,
  permissions jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update users table structure (add missing columns)
DO $$
BEGIN
  -- Add phone column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'phone'
  ) THEN
    ALTER TABLE users ADD COLUMN phone text;
  END IF;

  -- Add status column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'status'
  ) THEN
    ALTER TABLE users ADD COLUMN status text DEFAULT 'active';
  END IF;

  -- Rename password to password_hash if needed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'password'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'password_hash'
  ) THEN
    ALTER TABLE users RENAME COLUMN password TO password_hash;
  END IF;
END $$;

-- Create user_roles junction table for RBAC
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES users(id),
  is_active boolean DEFAULT true,
  UNIQUE(user_id, role_id)
);

-- Create user_profiles table for extended information
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  address text,
  dob date,
  gender text,
  profile_pic text,
  preferences jsonb DEFAULT '{}',
  bio text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roles table
CREATE POLICY "Anyone can read active roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Only admins can manage roles"
  ON roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() 
      AND r.role_name = 'admin'
      AND ur.is_active = true
    )
  );

-- RLS Policies for user_roles table
CREATE POLICY "Users can read own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all user roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() 
      AND r.role_name = 'admin'
      AND ur.is_active = true
    )
  );

CREATE POLICY "Admins can manage user roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() 
      AND r.role_name = 'admin'
      AND ur.is_active = true
    )
  );

-- RLS Policies for user_profiles table
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() 
      AND r.role_name = 'admin'
      AND ur.is_active = true
    )
  );

-- Insert default roles
INSERT INTO roles (role_name, description, permissions) VALUES 
('admin', 'System administrator with full access', '{"all": true}'),
('user', 'Regular platform user', '{"tournaments": "join", "rewards": "claim", "games": "test"}'),
('moderator', 'Community moderator', '{"forums": "moderate", "users": "warn", "content": "review"}'),
('host', 'Tournament host', '{"tournaments": "create", "events": "manage"}'),
('developer', 'Game developer', '{"games": "submit", "feedback": "view"}'),
('tester', 'Game tester', '{"games": "test", "feedback": "provide"})
ON CONFLICT (role_name) DO NOTHING;

-- Create function to assign default role to new users
CREATE OR REPLACE FUNCTION assign_default_user_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Assign 'user' role to new users
  INSERT INTO user_roles (user_id, role_id)
  SELECT NEW.id, r.id
  FROM roles r
  WHERE r.role_name = 'user'
  AND r.is_active = true;
  
  -- Create default user profile
  INSERT INTO user_profiles (user_id, preferences)
  VALUES (NEW.id, '{"notifications": true, "theme": "dark", "language": "en"}');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-assign role and profile
DROP TRIGGER IF EXISTS assign_user_role_trigger ON users;
CREATE TRIGGER assign_user_role_trigger
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION assign_default_user_role();

-- Create function to get user roles
CREATE OR REPLACE FUNCTION get_user_roles(user_uuid uuid)
RETURNS TABLE(role_name text, permissions jsonb) AS $$
BEGIN
  RETURN QUERY
  SELECT r.role_name, r.permissions
  FROM user_roles ur
  JOIN roles r ON ur.role_id = r.id
  WHERE ur.user_id = user_uuid
  AND ur.is_active = true
  AND r.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Create function to check user permission
CREATE OR REPLACE FUNCTION user_has_permission(user_uuid uuid, permission_key text)
RETURNS boolean AS $$
DECLARE
  has_permission boolean := false;
  role_perms jsonb;
BEGIN
  -- Check if user has admin role (full access)
  SELECT EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = user_uuid
    AND r.role_name = 'admin'
    AND ur.is_active = true
    AND r.is_active = true
  ) INTO has_permission;
  
  IF has_permission THEN
    RETURN true;
  END IF;
  
  -- Check specific permissions
  FOR role_perms IN
    SELECT r.permissions
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = user_uuid
    AND ur.is_active = true
    AND r.is_active = true
  LOOP
    IF role_perms ? permission_key THEN
      has_permission := true;
      EXIT;
    END IF;
  END LOOP;
  
  RETURN has_permission;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(role_name);

-- Update existing users to have proper roles if they don't already
DO $$
DECLARE
  user_record RECORD;
  user_role_id uuid;
  admin_role_id uuid;
  host_role_id uuid;
  moderator_role_id uuid;
BEGIN
  -- Get role IDs
  SELECT id INTO user_role_id FROM roles WHERE role_name = 'user';
  SELECT id INTO admin_role_id FROM roles WHERE role_name = 'admin';
  SELECT id INTO host_role_id FROM roles WHERE role_name = 'host';
  SELECT id INTO moderator_role_id FROM roles WHERE role_name = 'moderator';
  
  -- Assign roles to existing users based on their current role column
  FOR user_record IN SELECT id, role FROM users LOOP
    -- Skip if user already has roles assigned
    IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = user_record.id) THEN
      CASE user_record.role
        WHEN 'admin' THEN
          INSERT INTO user_roles (user_id, role_id) VALUES (user_record.id, admin_role_id);
        WHEN 'host' THEN
          INSERT INTO user_roles (user_id, role_id) VALUES (user_record.id, host_role_id);
        WHEN 'moderator' THEN
          INSERT INTO user_roles (user_id, role_id) VALUES (user_record.id, moderator_role_id);
        ELSE
          INSERT INTO user_roles (user_id, role_id) VALUES (user_record.id, user_role_id);
      END CASE;
      
      -- Create profile if it doesn't exist
      IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE user_id = user_record.id) THEN
        INSERT INTO user_profiles (user_id, preferences)
        VALUES (user_record.id, '{"notifications": true, "theme": "dark", "language": "en"}');
      END IF;
    END IF;
  END LOOP;
END $$;