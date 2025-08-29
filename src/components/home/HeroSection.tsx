import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gamepad2, Trophy, Users } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cyberpunk-grid bg-[length:50px_50px]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase">The Ultimate Gaming Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              <span className="gradient-text">Riyadah Elite</span> <br />
              <span className="text-neutral-100">Gaming Platform</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-xl">
              Join the elite community of gamers and developers. Test cutting-edge games,
              compete in esports tournaments, and connect with like-minded players.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn btn-primary">
                Join Now
                <ChevronRight size={18} />
              </Link>
              <Link to="/tournaments" className="btn btn-outline">
                Browse Tournaments
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                    <Gamepad2 className="text-primary h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">150+</h3>
                <p className="text-neutral-400 text-sm">Games Tested</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-2">
                    <Trophy className="text-secondary h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">50+</h3>
                <p className="text-neutral-400 text-sm">Tournaments</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-2">
                    <Users className="text-accent h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">10K+</h3>
                <p className="text-neutral-400 text-sm">Active Gamers</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/30 to-accent/30 rounded-lg blur-xl opacity-70"></div>
              <div className="relative z-10 rounded-lg overflow-hidden border border-neutral-700 shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Riyadah Elite Gaming" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 p-4 bg-background-secondary rounded-lg border border-neutral-700 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Trophy className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-semibold">$50,000</p>
                  <p className="text-xs text-neutral-400">Prize Pool</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 p-4 bg-background-secondary rounded-lg border border-neutral-700 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Gamepad2 className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-semibold">New Games</p>
                  <p className="text-xs text-neutral-400">Weekly Releases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;