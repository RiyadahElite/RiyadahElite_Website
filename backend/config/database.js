import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Allow server to start without Supabase credentials for initial setup
let supabase = null;

if (supabaseUrl && supabaseServiceKey && supabaseUrl !== 'your_supabase_project_url_here') {
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
  console.warn('⚠️  Supabase credentials not configured. Please update .env file with your Supabase credentials.');
  console.warn('   Visit: https://supabase.com/dashboard to get your project credentials');
}

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
      return {
        id: 'mock-user-id',
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
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
      // Return mock admin user for development
      if (email === 'admin@gmail.com') {
        return {
          id: 'admin-mock-id',
          username: 'Admin',
          email: 'admin@gmail.com',
          password: '$2a$12$LQv3c1yqBwEHFl2cpL6/VO/IVVVVUZppy5y/9th7u6CQ0VTOqK1S2', // Admin@123
          role: 'admin',
          points: 1000,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
      return null;
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
      // Return mock user for development
      return {
        id: id,
        username: 'MockUser',
        email: 'user@example.com',
        role: 'user',
        points: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
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
      // Mock user update for development
      return {
        id: id,
        ...updates,
        updated_at: new Date().toISOString()
      };
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

  // Tournaments
  async getTournaments() {
    if (!supabase) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('tournaments')
      .select(`
        *,
        created_by_user:users!tournaments_created_by_fkey(username)
      `)
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

  async joinTournament(userId, tournamentId) {
    if (!supabase) {
      throw new Error('Database not configured');
    }
    
    const { data, error } = await supabase
      .from('user_tournaments')
      .insert([{ user_id: userId, tournament_id: tournamentId }])
      .select()
      .single();
    
    if (error) throw error;
    
    // Log activity
    await this.logActivity(userId, 'tournament_join', 'Joined tournament', 10, tournamentId);
    
    return data;
  },

  // Rewards
  async getRewards() {
    if (!supabase) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true)
      .order('points_required', { ascending: true });
    
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
      .order('redeemed_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async claimReward(userId, rewardId) {
    if (!supabase) {
      throw new Error('Database not configured');
    }
    
    // Get user and reward info
    const [user, reward] = await Promise.all([
      this.getUserById(userId),
      supabase.from('rewards').select('*').eq('id', rewardId).single()
    ]);
    
    if (!user || !reward.data) {
      throw new Error('User or reward not found');
    }
    
    if (user.points < reward.data.points_required) {
      throw new Error('Insufficient points');
    }
    
    if (reward.data.stock <= 0) {
      throw new Error('Reward out of stock');
    }
    
    // Claim reward
    const { data, error } = await supabase
      .from('user_rewards')
      .insert([{ user_id: userId, reward_id: rewardId }])
      .select()
      .single();
    
    if (error) throw error;
    
    // Update user points and reward stock
    await Promise.all([
      this.updateUser(userId, { points: user.points - reward.data.points_required }),
      supabase.from('rewards').update({ stock: reward.data.stock - 1 }).eq('id', rewardId)
    ]);
    
    // Log activity
    await this.logActivity(userId, 'reward_claim', `Claimed ${reward.data.title}`, -reward.data.points_required, null, rewardId);
    
    return data;
  },

  // User activity
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