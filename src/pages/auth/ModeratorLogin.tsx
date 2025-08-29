import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const ModeratorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginModerator } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Moderator Login | Riyadah Elite';
  }, []);

  const validateForm = () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!password) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await loginModerator({ email: email.trim(), password });
      navigate('/moderator/dashboard');
    } catch (error: any) {
      console.error('Moderator login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-32 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo className="h-16 mx-auto" />
          </Link>
          <div className="flex items-center justify-center mt-6 mb-4">
            <UserCheck className="h-8 w-8 text-accent mr-3" />
            <h1 className="text-3xl font-bold">
              <span className="text-accent">Moderator</span> Login
            </h1>
          </div>
          <p className="text-neutral-400">Access the moderator dashboard</p>
        </div>

        <div className="card border-accent/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                Moderator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-neutral-200"
                  placeholder="Enter moderator email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-neutral-200"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-accent"
            >
              {isLoading ? (
                <LoadingSpinner size={20} className="mx-auto" />
              ) : (
                <>
                  <UserCheck size={18} />
                  Sign in as Moderator
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-500">
            <p>Default credentials: moderator@riyadahelite.com / Mod@123</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-neutral-400 hover:text-neutral-300 inline-flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModeratorLogin;