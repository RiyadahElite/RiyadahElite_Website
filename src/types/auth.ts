export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  description?: string;
  start_date: string;
  end_date: string;
  prize_pool?: string;
  max_participants: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  created_by: string;
  created_at: string;
}

export interface Reward {
  id: string;
  title: string;
  description?: string;
  points: number;
  category: string;
  image_url?: string;
  stock: number;
  is_active: boolean;
  created_at: string;
}

export interface Game {
  id: string;
  title: string;
  developer: string;
  genre: string;
  description?: string;
  status: 'pending' | 'approved' | 'testing' | 'completed' | 'rejected';
  image_url?: string;
  submitted_by: string;
  created_at: string;
}

export interface UserTournament {
  id: string;
  user_id: string;
  tournament_id: string;
  status: 'registered' | 'active' | 'completed' | 'disqualified';
  joined_at: string;
  tournament: Tournament;
}

export interface UserReward {
  id: string;
  user_id: string;
  reward_id: string;
  status: 'claimed' | 'shipped' | 'delivered';
  claimed_at: string;
  reward: Reward;
}

export interface UserActivity {
  id: string;
  user_id: string;
  tournament_id?: string;
  reward_id?: string;
  activity_type: 'registration' | 'login' | 'tournament_join' | 'tournament_leave' | 'reward_claim' | 'points_earned' | 'profile_update';
  description: string;
  points_change: number;
  status: string;
  created_at: string;
  tournament?: { title: string };
  reward?: { title: string };
}

export interface DashboardData {
  user: User;
  tournaments: UserTournament[];
  rewards: UserReward[];
  activity: UserActivity[];
  stats: {
    totalTournaments: number;
    totalRewards: number;
    totalPoints: number;
  };
}