const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase credentials not found. Using placeholder database functions.');
}

// Create Supabase client for server-side operations
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Database helper functions
const db = {
  // Users
  async createUser(userData) {
    if (!supabase) {
      console.log('Placeholder: Creating user', userData);
      return { id: 'placeholder-id', ...userData };
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
      console.log('Placeholder: Getting user by email', email);
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
      console.log('Placeholder: Getting user by ID', id);
      return { id, username: 'placeholder', email: 'placeholder@example.com' };
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
      console.log('Placeholder: Updating user', id, updates);
      return { id, ...updates };
    }
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Tournaments
  async getTournaments() {
    if (!supabase) {
      console.log('Placeholder: Getting tournaments');
      return [
        {
          id: '1',
          title: 'Apex Legends Championship',
          game_name: 'Apex Legends',
          start_date: '2025-02-15T18:00:00Z',
          end_date: '2025-02-15T22:00:00Z',
          prize_pool: '$10,000',
          status: 'upcoming'
        }
      ];
    }
    
    const { data, error } = await supabase
      .from('tournaments')
      .select(`
        *,
        created_by_user:users!tournaments_created_by_fkey(username)
      `)
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getTournamentById(id) {
    if (!supabase) {
      console.log('Placeholder: Getting tournament by ID', id);
      return { id, title: 'Sample Tournament' };
    }
    
    const { data, error } = await supabase
      .from('tournaments')
      .select(`
        *,
        created_by_user:users!tournaments_created_by_fkey(username),
        participants:user_participation(
          id,
          status,
          joined_at,
          user:users(username)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createTournament(tournamentData) {
    if (!supabase) {
      console.log('Placeholder: Creating tournament', tournamentData);
      return { id: 'placeholder-id', ...tournamentData };
    }
    
    const { data, error } = await supabase
      .from('tournaments')
      .insert([tournamentData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // User Participation
  async joinTournament(userId, tournamentId) {
    if (!supabase) {
      console.log('Placeholder: Joining tournament', userId, tournamentId);
      return { id: 'placeholder-id', user_id: userId, tournament_id: tournamentId };
    }
    
    const { data, error } = await supabase
      .from('user_participation')
      .insert([{ user_id: userId, tournament_id: tournamentId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async leaveTournament(userId, tournamentId) {
    if (!supabase) {
      console.log('Placeholder: Leaving tournament', userId, tournamentId);
      return true;
    }
    
    const { error } = await supabase
      .from('user_participation')
      .delete()
      .eq('user_id', userId)
      .eq('tournament_id', tournamentId);
    
    if (error) throw error;
    return true;
  },

  async getUserTournaments(userId) {
    if (!supabase) {
      console.log('Placeholder: Getting user tournaments', userId);
      return [];
    }
    
    const { data, error } = await supabase
      .from('user_participation')
      .select(`
        *,
        tournament:tournaments(*)
      `)
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Rewards
  async getRewards() {
    if (!supabase) {
      console.log('Placeholder: Getting rewards');
      return [
        {
          id: '1',
          title: 'Gaming Mouse',
          description: 'High-precision gaming mouse',
          points_required: 500,
          category: 'hardware',
          stock: 10
        }
      ];
    }
    
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true)
      .order('points_required', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async claimReward(userId, rewardId) {
    if (!supabase) {
      console.log('Placeholder: Claiming reward', userId, rewardId);
      return { id: 'placeholder-id', user_id: userId, reward_id: rewardId };
    }
    
    // Start a transaction to check user points and claim reward
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const { data: reward, error: rewardError } = await supabase
      .from('rewards')
      .select('points_required, stock')
      .eq('id', rewardId)
      .single();
    
    if (rewardError) throw rewardError;
    
    if (user.points < reward.points_required) {
      throw new Error('Insufficient points');
    }
    
    if (reward.stock <= 0) {
      throw new Error('Reward out of stock');
    }
    
    // Claim the reward
    const { data, error } = await supabase
      .from('user_rewards')
      .insert([{ user_id: userId, reward_id: rewardId }])
      .select()
      .single();
    
    if (error) throw error;
    
    // Update user points and reward stock
    await supabase
      .from('users')
      .update({ points: user.points - reward.points_required })
      .eq('id', userId);
    
    await supabase
      .from('rewards')
      .update({ stock: reward.stock - 1 })
      .eq('id', rewardId);
    
    return data;
  },

  async getUserRewards(userId) {
    if (!supabase) {
      console.log('Placeholder: Getting user rewards', userId);
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
    return data;
  },

  // Games
  async getGames() {
    if (!supabase) {
      console.log('Placeholder: Getting games');
      return [
        {
          id: '1',
          title: 'Sample Game',
          developer: 'Sample Studio',
          genre: 'Action',
          status: 'approved'
        }
      ];
    }
    
    const { data, error } = await supabase
      .from('games')
      .select(`
        *,
        submitted_by_user:users!games_submitted_by_fkey(username)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createGame(gameData) {
    if (!supabase) {
      console.log('Placeholder: Creating game', gameData);
      return { id: 'placeholder-id', ...gameData };
    }
    
    const { data, error } = await supabase
      .from('games')
      .insert([gameData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateGame(id, updates) {
    if (!supabase) {
      console.log('Placeholder: Updating game', id, updates);
      return { id, ...updates };
    }
    
    const { data, error } = await supabase
      .from('games')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

module.exports = { db, supabase };