import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gamepad2, Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  'Access to unreleased games',
  'Provide valuable feedback to developers',
  'Earn rewards for participation',
  'Join exclusive beta testing communities',
  'Influence the future of gaming'
];

const GameTestingSection = () => {
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
    <section className="py-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg blur-xl opacity-70"></div>
              <div className="relative z-10 rounded-lg overflow-hidden border border-neutral-700 shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/7915575/pexels-photo-7915575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Game Testing" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 p-4 bg-background-secondary rounded-lg border border-neutral-700 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Gamepad2 className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-semibold">20+ Games</p>
                  <p className="text-xs text-neutral-400">Available for Testing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase">Beta Testing Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Become a <span className="gradient-text">Game Tester</span> <br/>
              Shape the Future of Gaming
            </h2>
            <p className="text-neutral-300 mb-8">
              Join our game testing program to get early access to unreleased games, 
              provide valuable feedback to developers, and earn rewards for your contribution.
              Help shape the future of gaming while enjoying exclusive access to new titles.
            </p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center"
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-success" />
                  </span>
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/game-test" className="btn btn-primary">
              Join Testing Program
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameTestingSection;