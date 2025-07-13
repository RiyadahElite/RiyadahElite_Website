import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../services/api';
import { DashboardData } from '../../types/auth';
import { Trophy, Star, Gamepad2, Users, Calendar, Gift, Activity, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | Riyadh Elite';
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await auth.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set default data structure if API fails
      setDashboardData({
        user: user!,
        tournaments: [],
        rewards: [],
        activity: [],
        stats: {
          totalTournaments: 0,
          totalRewards: 0,
          totalPoints: user?.points || 0
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-32 bg-background flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen py-32 bg-background">
        <div className="container mx-auto px-4">
          <EmptyState 
            title="Failed to load dashboard"
            message="Please try refreshing the page"
          />
        </div>
      </div>
    );
  }

  const { tournaments, rewards, activity, stats } = dashboardData;

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-neutral-400">
            Here's what's happening in your gaming journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Points Balance</p>
                <p className="text-2xl font-bold text-primary">{user?.points || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Tournaments Joined</p>
                <p className="text-2xl font-bold text-secondary">{stats.totalTournaments}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Rewards Claimed</p>
                <p className="text-2xl font-bold text-accent">{stats.totalRewards}</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Member Since</p>
                <p className="text-lg font-bold text-success">
                  {new Date(user?.created_at || '').toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tournaments */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-secondary" />
                My Tournaments
              </h2>
              <Link to="/tournaments" className="text-secondary hover:text-secondary-light text-sm">
                View All
              </Link>
            </div>

            {tournaments.length > 0 ? (
              <div className="space-y-4">
                {tournaments.slice(0, 3).map((userTournament) => (
                  <div key={userTournament.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-neutral-800">
                    <div>
                      <h3 className="font-semibold text-neutral-200">{userTournament.tournament.title}</h3>
                      <p className="text-sm text-neutral-400">{userTournament.tournament.game}</p>
                      <p className="text-xs text-neutral-500 flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(userTournament.tournament.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        userTournament.status === 'registered' 
                          ? 'bg-primary/20 text-primary' 
                          : userTournament.status === 'active'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-success/20 text-success'
                      }`}>
                        {userTournament.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400 mb-4">No tournaments joined yet</p>
                <Link to="/tournaments" className="btn btn-secondary btn-sm">
                  Browse Tournaments
                </Link>
              </div>
            )}
          </div>

          {/* Recent Rewards */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Gift className="h-5 w-5 mr-2 text-accent" />
                My Rewards
              </h2>
              <Link to="/rewards" className="text-accent hover:text-accent-light text-sm">
                View All
              </Link>
            </div>

            {rewards.length > 0 ? (
              <div className="space-y-4">
                {rewards.slice(0, 3).map((userReward) => (
                  <div key={userReward.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-neutral-800">
                    <div>
                      <h3 className="font-semibold text-neutral-200">{userReward.reward.title}</h3>
                      <p className="text-sm text-neutral-400">{userReward.reward.category}</p>
                      <p className="text-xs text-neutral-500">
                        Claimed: {new Date(userReward.claimed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        userReward.status === 'claimed' 
                          ? 'bg-warning/20 text-warning' 
                          : userReward.status === 'shipped'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-success/20 text-success'
                      }`}>
                        {userReward.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400 mb-4">No rewards claimed yet</p>
                <Link to="/rewards" className="btn btn-accent btn-sm">
                  Browse Rewards
                </Link>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </h2>
            </div>

            {activity.length > 0 ? (
              <div className="space-y-4">
                {activity.map((activityItem) => (
                  <div key={activityItem.id} className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-neutral-800">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activityItem.activity_type === 'tournament_join' ? 'bg-secondary/20 text-secondary' :
                      activityItem.activity_type === 'reward_claim' ? 'bg-accent/20 text-accent' :
                      activityItem.activity_type === 'points_earned' ? 'bg-success/20 text-success' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {activityItem.activity_type === 'tournament_join' ? <Trophy className="h-4 w-4" /> :
                       activityItem.activity_type === 'reward_claim' ? <Gift className="h-4 w-4" /> :
                       activityItem.activity_type === 'points_earned' ? <TrendingUp className="h-4 w-4" /> :
                       <Activity className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-200">{activityItem.description}</p>
                      <p className="text-xs text-neutral-500">
                        {new Date(activityItem.created_at).toLocaleDateString()}
                      </p>
                      {activityItem.points_change !== 0 && (
                        <p className={`text-xs font-semibold ${
                          activityItem.points_change > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {activityItem.points_change > 0 ? '+' : ''}{activityItem.points_change} points
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/tournaments" className="card hover:border-secondary/50 transition-all duration-300 text-center">
              <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold">Join Tournament</h3>
              <p className="text-sm text-neutral-400">Compete with others</p>
            </Link>

            <Link to="/rewards" className="card hover:border-accent/50 transition-all duration-300 text-center">
              <Gift className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold">Claim Rewards</h3>
              <p className="text-sm text-neutral-400">Redeem your points</p>
            </Link>

            <Link to="/game-test" className="card hover:border-success/50 transition-all duration-300 text-center">
              <Gamepad2 className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="font-semibold">Test Games</h3>
              <p className="text-sm text-neutral-400">Try new games</p>
            </Link>

            <Link to="/community" className="card hover:border-primary/50 transition-all duration-300 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Community</h3>
              <p className="text-sm text-neutral-400">Connect with gamers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;