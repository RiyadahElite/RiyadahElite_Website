import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Login | Riyadah Elite';
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
      await login({ email: email.trim(), password });

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      // Error is already handled by the API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold mt-6">
            Welcome to <span className="gradient-text">Riyadah Elite</span>
          </h1>
          <p className="text-neutral-400 mt-2">Sign in to your account</p>
        </div>

        <div className="card border-primary/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  placeholder="Enter your email"
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
                  className="w-full pl-10 pr-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-700 text-primary focus:ring-primary bg-background"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-neutral-400">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-light">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary"
            >
              {isLoading ? (
                <LoadingSpinner size={20} className="mx-auto" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-400">Don't have an account?</span>{' '}
            <Link to="/register" className="text-primary hover:text-primary-light font-medium">
              Sign up
            </Link>
          </div>

          {/* Staff Login Links */}
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <p className="text-center text-xs text-neutral-500 mb-3">Staff Access</p>
            <div className="flex flex-col space-y-2 text-center">
              <Link to="/admin-login" className="text-xs text-neutral-400 hover:text-primary">
                Riyadah Elite Admin Login
              </Link>
              <Link to="/host-login" className="text-xs text-neutral-400 hover:text-secondary">
                Tournament Host Login
              </Link>
              <Link to="/moderator-login" className="text-xs text-neutral-400 hover:text-accent">
                Community Moderator Login
              </Link>
            </div>
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

export default Login;