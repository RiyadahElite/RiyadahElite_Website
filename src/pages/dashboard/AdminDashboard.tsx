import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Users, Trophy, Settings, BarChart3, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Admin Dashboard | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
          </div>
          <p className="text-neutral-400">
            Welcome back, <span className="text-primary font-semibold">{user?.name}</span>. 
            Manage the Riyadah Elite platform from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-primary">1,247</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Active Tournaments</p>
                <p className="text-2xl font-bold text-secondary">23</p>
              </div>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">System Health</p>
                <p className="text-2xl font-bold text-success">100%</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-accent">$45,230</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-bold">User Management</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Manage user accounts, roles, and permissions across the platform.
            </p>
            <button className="btn btn-primary btn-sm">
              Manage Users
            </button>
          </div>

          <div className="card hover:border-secondary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-secondary mr-3" />
              <h3 className="text-xl font-bold">Tournament Control</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Create, manage, and monitor tournaments and competitions.
            </p>
            <button className="btn btn-secondary btn-sm">
              Manage Tournaments
            </button>
          </div>

          <div className="card hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-accent mr-3" />
              <h3 className="text-xl font-bold">System Settings</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Configure platform settings, features, and integrations.
            </p>
            <button className="btn btn-accent btn-sm">
              System Settings
            </button>
          </div>

          <div className="card hover:border-success/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <UserPlus className="h-6 w-6 text-success mr-3" />
              <h3 className="text-xl font-bold">Staff Management</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Add and manage hosts, moderators, and other staff members.
            </p>
            <button className="btn btn-success btn-sm">
              Manage Staff
            </button>
          </div>

          <div className="card hover:border-warning/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-warning mr-3" />
              <h3 className="text-xl font-bold">Analytics</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              View detailed analytics and reports about platform usage.
            </p>
            <button className="btn btn-warning btn-sm">
              View Analytics
            </button>
          </div>

          <div className="card hover:border-error/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-error mr-3" />
              <h3 className="text-xl font-bold">Security</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Monitor security events and manage platform security settings.
            </p>
            <button className="btn btn-outline btn-sm">
              Security Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;