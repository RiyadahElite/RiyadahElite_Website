import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Allow server to start without Supabase credentials for initial setup
let supabase = null;

if (supabaseUrl && supabaseServiceKey && supabaseUrl !== 'https://your-project.supabase.co') {
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
    id: 'admin-mock-id',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '$2a$12$LQv3c1yqBwEHFl2cpL6/VO/IVVVVUZppy5y/9th7u6CQ0VTOqK1S2', // Admin@123
    role: 'admin',
    points: 1000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockTournaments = [
  {
    id: 'tournament-1',
    title: 'Apex Legends Championship',
    description: 'Compete in the ultimate Apex Legends tournament',
    game: 'Apex Legends',
    start_date: '2025-09-15T10:00:00Z',
    end_date: '2025-09-15T18:00:00Z',
    prize_pool: '10000',
    max_participants: 128,
    status: 'upcoming',
    created_by: 'admin-mock-id',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockRewards = [
  {
    id: 'reward-1',
    title: 'Gaming Headset',
    description: 'High-quality gaming headset',
    points: 500,
    category: 'Hardware',
    stock: 10,
    is_active: true,
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
      // Mock user creation for development
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

  // Tournaments
  async getTournaments() {
    if (!supabase) {
      return mockTournaments;
    }
    
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getUserTournaments(userId) {
    if (!supabase) {
      return [];
    }
    
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

  // Rewards
  async getRewards() {
    if (!supabase) {
      return mockRewards;
    }
    
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .order('points', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getUserRewards(userId) {
    if (!supabase) {
      return [];
    }
    
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

  // Activity logging
  async logActivity(userId, activityType, description, pointsChange = 0, tournamentId = null, rewardId = null) {
    if (!supabase) {
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .insert([{
          user_id: userId,
          tournament_id: tournamentId,
          reward_id: rewardId,
          activity_type: activityType,
          description,
          points_change: pointsChange
        }]);
      
      if (error) console.error('Activity logging error:', error);
      return data;
    } catch (error) {
      console.error('Activity logging failed:', error);
      return null;
    }
  },

  async getUserActivity(userId, limit = 10) {
    if (!supabase) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('user_activity')
      .select(`
        *,
        tournament:tournaments(title),
        reward:rewards(title)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  }
};

export { db, supabase };