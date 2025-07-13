import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Gamepad2, Trophy, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
    ${isActive 
      ? 'text-primary' 
      : 'text-neutral-300 hover:text-primary hover:bg-background-secondary'
    }`;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo className="h-10" />
              <span className="ml-3 text-xl font-heading font-bold gradient-text">RIYADAH ELITE</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/community" className={navLinkClasses}>Community</NavLink>
              <NavLink to="/game-test" className={navLinkClasses}>Game Testing</NavLink>
              <NavLink to="/production" className={navLinkClasses}>Production</NavLink>
              <NavLink to="/arena" className={navLinkClasses}>Arena</NavLink>
              <NavLink to="/tournaments" className={navLinkClasses}>Tournaments</NavLink>
              <NavLink to="/rewards" className={navLinkClasses}>Rewards</NavLink>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-neutral-300 hover:text-primary px-3 py-2 rounded-md"
                >
                  <div 
                    className="h-8 w-8 rounded-full border-2 border-primary/50"
                    style={{ 
                      backgroundColor: '#009DFF20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#009DFF'
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {/* User Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background-secondary border border-neutral-800 rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-background hover:text-primary"
                    >
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/dashboard/tournaments" 
                      className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-background hover:text-primary"
                    >
                      <Trophy size={16} className="mr-2" />
                      My Tournaments
                    </Link>
                    <Link 
                      to="/dashboard/rewards" 
                      className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-background hover:text-primary"
                    >
                      <Star size={16} className="mr-2" />
                      My Rewards
                    </Link>
                    <Link 
                      to="/dashboard/games" 
                      className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:bg-background hover:text-primary"
                    >
                      <Gamepad2 size={16} className="mr-2" />
                      My Games
                    </Link>
                    <button 
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-error hover:bg-background"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-neutral-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-300 hover:text-primary hover:bg-background-secondary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background-secondary/90 backdrop-blur-sm">
          <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Home
          </NavLink>
          <NavLink to="/community" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Community
          </NavLink>
          <NavLink to="/game-test" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Game Testing
          </NavLink>
          <NavLink to="/production" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Production
          </NavLink>
          <NavLink to="/arena" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Arena
          </NavLink>
          <NavLink to="/tournaments" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Tournaments
          </NavLink>
          <NavLink to="/rewards" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
            Rewards
          </NavLink>
        </div>
        
        {/* Mobile User Actions */}
        <div className="pt-4 pb-3 border-t border-neutral-800 bg-background-secondary/90 backdrop-blur-sm">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div 
                    className="h-10 w-10 rounded-full border-2 border-primary/50" 
                    style={{ 
                      backgroundColor: '#009DFF20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#009DFF'
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-neutral-200">{user?.name}</div>
                  <div className="text-sm font-medium text-neutral-400">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
                  Dashboard
                </Link>
                <Link to="/dashboard/tournaments" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
                  My Tournaments
                </Link>
                <Link to="/dashboard/rewards" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
                  My Rewards
                </Link>
                <Link to="/dashboard/games" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-background">
                  My Games
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error hover:bg-background"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-2 px-5">
              <Link 
                to="/login" 
                className="w-full btn btn-outline btn-sm"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="w-full btn btn-primary btn-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;