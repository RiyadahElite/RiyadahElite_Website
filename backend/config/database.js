import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://zrwqpzvjjeunrccubgfd.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3FwenZqamV1bnJjY3ViZ2ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTA1ODg0NiwiZXhwIjoyMDY0NjM0ODQ2fQ.gdMcK2TqZfKDs3ymtzGDiXhcB1n9B-QFN_z4zRPWgCM';

// Allow server to start without Supabase credentials for initial setup
let supabase = null;

if (supabaseUrl && supabaseServiceKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error.message);
  }
} else {
  console.warn('⚠️  Supabase credentials not configured. Using mock mode.');
}

// Mock data for development
const mockUsers = [
  {
    id: 'user-mock-id',
    name: 'Test User',
    email: 'user@gmail.com',
    password: '$2a$12$LQv3c1yqBwEHFl2cpL6/VO/IVVVVUZppy5y/9th7u6CQ0VTOqK1S2', // User@123
    role: 'user',
    points: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockAdmins = [
  {
    id: 'admin-mock-id',
    name: 'Admin User',
    email: 'admin@riyadahelite.com',
    password: '$2a$12$LQv3c1yqBwEHFl2cpL6/VO/IVVVVUZppy5y/9th7u6CQ0VTOqK1S2', // Admin@123
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockHosts = [
  {
    id: 'host-mock-id',
    name: 'Tournament Host',
    email: 'host@riyadahelite.com',
    password: '$2a$12$8K7Qz9vXmN2pL4rS6tU8wO/JKLMNOPQRSTUVWXYZabcdefghijklmn', // Host@123
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockModerators = [
  {
    id: 'moderator-mock-id',
    name: 'Community Moderator',
    email: 'moderator@riyadahelite.com',
    password: '$2a$12$9L8Qa0wYnO3qM5sT7vV9xP/KLMNOPQRSTUVWXYZabcdefghijklmno', // Mod@123
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Database helper functions
const db = {
  // Test database connection
  async testConnection() {
    if (!supabase) {
      console.warn('Database not configured - using mock mode');
      return true;
    }
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      throw error;
    }
  },

  // Users
  async createUser(userData) {
    if (!supabase) {
      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockUsers.push(newUser);
      return newUser;
    }
    
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByEmail(email) {
    if (!supabase) {
      return mockUsers.find(user => user.email === email) || null;
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getUserById(id) {
    if (!supabase) {
      return mockUsers.find(user => user.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(id, updates) {
    if (!supabase) {
      const userIndex = mockUsers.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates, updated_at: new Date().toISOString() };
        return mockUsers[userIndex];
      }
      throw new Error('User not found');
    }
    
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Admins
  async getAdminByEmail(email) {
    if (!supabase) {
      return mockAdmins.find(admin => admin.email === email) || null;
    }
    
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getAdminById(id) {
    if (!supabase) {
      return mockAdmins.find(admin => admin.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Hosts
  async getHostByEmail(email) {
    if (!supabase) {
      return mockHosts.find(host => host.email === email) || null;
    }
    
    const { data, error } = await supabase
      .from('hosts')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getHostById(id) {
    if (!supabase) {
      return mockHosts.find(host => host.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('hosts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Moderators
  async getModeratorByEmail(email) {
    if (!supabase) {
      return mockModerators.find(mod => mod.email === email) || null;
    }
    
    const { data, error } = await supabase
      .from('moderators')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getModeratorById(id) {
    if (!supabase) {
      return mockModerators.find(mod => mod.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('moderators')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Activity logging
  async logActivity(userId, activityType, description, pointsChange = 0) {
    if (!supabase) {
      console.log(`Mock activity: ${description} for user ${userId}`);
      return;
    }
    
    const { error } = await supabase
      .from('user_activity')
      .insert([{
        user_id: userId,
        activity_type: activityType,
        description,
        points_change: pointsChange
      }]);
    
    if (error) console.error('Error logging activity:', error);
  },

  // Dashboard data
  async getUserTournaments(userId) {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('user_tournaments')
      .select(`
        *,
        tournament:tournaments(*)
      `)
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getUserRewards(userId) {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('user_rewards')
      .select(`
        *,
        reward:rewards(*)
      `)
      .eq('user_id', userId)
      .order('claimed_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getUserActivity(userId, limit = 10) {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  // Tournaments
  async getTournaments() {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getTournamentById(id) {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createTournament(tournamentData) {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('tournaments')
      .insert([tournamentData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async joinTournament(userId, tournamentId) {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('user_tournaments')
      .insert([{
        user_id: userId,
        tournament_id: tournamentId
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async leaveTournament(userId, tournamentId) {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('user_tournaments')
      .delete()
      .eq('user_id', userId)
      .eq('tournament_id', tournamentId);
    
    if (error) throw error;
  },

  // Rewards
  async getRewards() {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true)
      .order('points', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async claimReward(userId, rewardId) {
    if (!supabase) return null;
    
    // Get reward details
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();
    
    if (rewardError) throw rewardError;
    
    // Get user points
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    if (user.points < reward.points) {
      throw new Error('Insufficient points');
    }
    
    if (reward.stock <= 0) {
      throw new Error('Reward out of stock');
    }
    
    // Deduct points and update stock
    const { error: updateError } = await supabase
      .from('users')
      .update({ points: user.points - reward.points })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    const { error: stockError } = await supabase
      .from('rewards')
      .update({ stock: reward.stock - 1 })
      .eq('id', rewardId);
    
    if (stockError) throw stockError;
    
    // Create reward claim record
    const { data, error } = await supabase
      .from('user_rewards')
      .insert([{
        user_id: userId,
        reward_id: rewardId
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Games
  async getGames() {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createGame(gameData) {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('games')
      .insert([gameData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateGame(id, updates) {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('games')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export { db, supabase };