import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, MessageCircle, Flag, Shield, Users, BarChart3 } from 'lucide-react';

const ModeratorDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Moderator Dashboard | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <UserCheck className="h-8 w-8 text-accent mr-3" />
            <h1 className="text-4xl font-bold">
              Moderator <span className="text-accent">Dashboard</span>
            </h1>
          </div>
          <p className="text-neutral-400">
            Welcome back, <span className="text-accent font-semibold">{user?.name}</span>. 
            Keep the community safe and engaged.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Pending Reports</p>
                <p className="text-2xl font-bold text-warning">7</p>
              </div>
              <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                <Flag className="h-6 w-6 text-warning" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-success">1,234</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Forum Posts</p>
                <p className="text-2xl font-bold text-primary">456</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Actions Today</p>
                <p className="text-2xl font-bold text-accent">23</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:border-warning/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Flag className="h-6 w-6 text-warning mr-3" />
              <h3 className="text-xl font-bold">Review Reports</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Review and take action on user reports and flagged content.
            </p>
            <button className="btn btn-warning btn-sm">
              Review Reports
            </button>
          </div>

          <div className="card hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-bold">Forum Moderation</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Monitor and moderate forum discussions and community posts.
            </p>
            <button className="btn btn-primary btn-sm">
              Moderate Forums
            </button>
          </div>

          <div className="card hover:border-success/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-success mr-3" />
              <h3 className="text-xl font-bold">User Management</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Manage user accounts, warnings, and community guidelines.
            </p>
            <button className="btn btn-success btn-sm">
              Manage Users
            </button>
          </div>

          <div className="card hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-accent mr-3" />
              <h3 className="text-xl font-bold">Safety Tools</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Access advanced moderation tools and safety features.
            </p>
            <button className="btn btn-accent btn-sm">
              Safety Tools
            </button>
          </div>

          <div className="card hover:border-secondary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-secondary mr-3" />
              <h3 className="text-xl font-bold">Community Stats</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              View community engagement and moderation statistics.
            </p>
            <button className="btn btn-secondary btn-sm">
              View Stats
            </button>
          </div>

          <div className="card hover:border-neutral-500 transition-all duration-300">
            <div className="flex items-center mb-4">
              <UserCheck className="h-6 w-6 text-neutral-400 mr-3" />
              <h3 className="text-xl font-bold">Moderator Tools</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Configure your moderator preferences and notification settings.
            </p>
            <button className="btn btn-outline btn-sm">
              Tools & Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;