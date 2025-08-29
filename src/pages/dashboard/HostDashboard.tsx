import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Trophy, Calendar, Settings, Plus, BarChart3 } from 'lucide-react';

const HostDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Host Dashboard | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-secondary mr-3" />
            <h1 className="text-4xl font-bold">
              Host <span className="text-secondary">Dashboard</span>
            </h1>
          </div>
          <p className="text-neutral-400">
            Welcome back, <span className="text-secondary font-semibold">{user?.name}</span>. 
            Manage your tournaments and events from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">My Tournaments</p>
                <p className="text-2xl font-bold text-secondary">12</p>
              </div>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Total Participants</p>
                <p className="text-2xl font-bold text-primary">1,847</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold text-accent">5</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-success">98%</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:border-secondary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Plus className="h-6 w-6 text-secondary mr-3" />
              <h3 className="text-xl font-bold">Create Tournament</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Set up a new tournament with custom rules and prize pools.
            </p>
            <button className="btn btn-secondary btn-sm">
              Create Tournament
            </button>
          </div>

          <div className="card hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-bold">Manage Tournaments</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              View and manage your existing tournaments and participants.
            </p>
            <button className="btn btn-primary btn-sm">
              View Tournaments
            </button>
          </div>

          <div className="card hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-accent mr-3" />
              <h3 className="text-xl font-bold">Schedule Events</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Plan and schedule upcoming tournaments and events.
            </p>
            <button className="btn btn-accent btn-sm">
              Schedule Event
            </button>
          </div>

          <div className="card hover:border-success/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-success mr-3" />
              <h3 className="text-xl font-bold">Participant Management</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Manage registrations, check-ins, and participant communications.
            </p>
            <button className="btn btn-success btn-sm">
              Manage Participants
            </button>
          </div>

          <div className="card hover:border-warning/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-warning mr-3" />
              <h3 className="text-xl font-bold">Tournament Analytics</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              View detailed statistics and performance metrics for your events.
            </p>
            <button className="btn btn-warning btn-sm">
              View Analytics
            </button>
          </div>

          <div className="card hover:border-neutral-500 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-neutral-400 mr-3" />
              <h3 className="text-xl font-bold">Host Settings</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Configure your host profile and tournament preferences.
            </p>
            <button className="btn btn-outline btn-sm">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;