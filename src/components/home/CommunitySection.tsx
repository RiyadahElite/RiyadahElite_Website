import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, Video, Award, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Mock community stats
const stats = [
  {
    value: '15K+',
    label: 'Active Members',
    icon: Users,
    color: 'primary'
  },
  {
    value: '350+',
    label: 'Daily Discussions',
    icon: MessageCircle,
    color: 'secondary'
  },
  {
    value: '50+',
    label: 'Live Streams',
    icon: Video,
    color: 'accent'
  },
  {
    value: '1000+',
    label: 'Achievements',
    icon: Award,
    color: 'success'
  }
];

const CommunitySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section className="py-20 bg-background-secondary" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase">Join Our Community</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect with Fellow <span className="gradient-text">Gamers</span>
          </h2>
          <p className="text-neutral-400">
            Become part of a thriving community of gamers, developers, and esports enthusiasts.
            Share experiences, form teams, and participate in discussions.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              primary: 'bg-primary/10 text-primary',
              secondary: 'bg-secondary/10 text-secondary',
              accent: 'bg-accent/10 text-accent',
              success: 'bg-success/10 text-success'
            };
            
            return (
              <div 
                key={index} 
                className={`card text-center transition-all duration-700 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                    <Icon size={28} />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-neutral-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Community Features */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="card">
            <h3 className="text-xl font-bold mb-3">Forums & Discussions</h3>
            <p className="text-neutral-400 mb-4">
              Engage in discussions about your favorite games, strategies, and gaming news.
              Share your experiences and learn from others.
            </p>
            <Link 
              to="/community/forums" 
              className="inline-flex items-center text-primary hover:text-primary-light font-medium"
            >
              Browse Forums
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-3">Team Formation</h3>
            <p className="text-neutral-400 mb-4">
              Find teammates for tournaments, create or join a clan, and build 
              lasting gaming relationships in our team hub.
            </p>
            <Link 
              to="/community/teams" 
              className="inline-flex items-center text-primary hover:text-primary-light font-medium"
            >
              Find Teams
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-3">Live Streams</h3>
            <p className="text-neutral-400 mb-4">
              Watch live tournaments, game testing sessions, and connect with 
              popular streamers in our community.
            </p>
            <Link 
              to="/community/streams" 
              className="inline-flex items-center text-primary hover:text-primary-light font-medium"
            >
              Watch Streams
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/community" className="btn btn-primary">
            Explore Community
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;