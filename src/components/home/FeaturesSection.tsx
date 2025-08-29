import { Gamepad2, Trophy, Users, Zap, Flame, BadgeCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'Game Testing',
    description: 'Test unreleased games and provide feedback to developers. Earn rewards for your contributions.',
    icon: Gamepad2,
    color: 'primary',
    delay: 0
  },
  {
    title: 'Esports Tournaments',
    description: 'Compete in tournaments for both fun and prizes. Show your skills and climb the leaderboards.',
    icon: Trophy,
    color: 'secondary',
    delay: 150
  },
  {
    title: 'Community Features',
    description: 'Connect with like-minded gamers, join teams, and participate in discussions.',
    icon: Users,
    color: 'accent',
    delay: 300
  },
  {
    title: 'Game Production Portal',
    description: 'For indie developers to showcase their games and get valuable user feedback.',
    icon: Zap,
    color: 'primary',
    delay: 450
  },
  {
    title: 'Live Streaming',
    description: 'Watch tournaments, game testing sessions, and connect with streamers.',
    icon: Flame,
    color: 'secondary',
    delay: 600
  },
  {
    title: 'Rewards System',
    description: 'Earn points for activities and redeem them for games, merch, and exclusive content.',
    icon: BadgeCheck,
    color: 'accent',
    delay: 750
  }
];

const FeatureCard = ({ feature, isVisible }: { feature: typeof features[0], isVisible: boolean }) => {
  const { title, description, icon: Icon, color, delay } = feature;
  
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/30',
    secondary: 'bg-secondary/10 text-secondary border-secondary/30',
    accent: 'bg-accent/10 text-accent border-accent/30'
  };

  return (
    <div 
      className={`card transition-all duration-700 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`rounded-full w-12 h-12 flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]} mb-4 border`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Features</span> that Set Us Apart
          </h2>
          <p className="text-neutral-400">
            Riyadah Elite offers a comprehensive platform for gamers and developers 
            with unique features designed to enhance your gaming experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;