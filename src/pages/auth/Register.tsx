import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/ui/Logo';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register | Riyadah Elite';
  }, []);

  const validateForm = () => {
    if (!username.trim()) {
      toast.error('Username is required');
      return false;
    }
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register({ name: username.trim(), email: email.trim(), password });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      // Error is already handled by the API interceptor
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
          <h1 className="text-3xl font-bold mt-6">
            Join <span className="gradient-text">Riyadah Elite</span>
          </h1>
          <p className="text-neutral-400 mt-2">Create your account</p>
        </div>

        <div className="card border-primary/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-700 text-primary focus:ring-primary bg-background"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-neutral-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary-light">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary-light">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary"
            >
              {isLoading ? (
                <LoadingSpinner size={20} className="mx-auto" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-400">Already have an account?</span>{' '}
            <Link to="/login" className="text-primary hover:text-primary-light font-medium">
              Sign in
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

export default Register;
