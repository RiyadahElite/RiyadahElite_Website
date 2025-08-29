import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Check, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Mock game testing data
const availableGames = [
  {
    id: 1,
    title: 'Nebula Ascent',
    developer: 'Stellar Studios',
    genre: 'Sci-Fi RPG',
    testers: 120,
    deadline: '2025-09-15',
    status: 'Open',
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A sci-fi RPG set in a distant galaxy where players navigate political intrigue and cosmic threats.'
  },
  {
    id: 2,
    title: 'Tactical Legends',
    developer: 'Strategy Masters',
    genre: 'Tactical Shooter',
    testers: 85,
    deadline: '2025-08-20',
    status: 'Open',
    image: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A team-based tactical shooter with unique character abilities and strategic gameplay.'
  },
  {
    id: 3,
    title: 'Shadow Realms',
    developer: 'Mystic Games',
    genre: 'Action Adventure',
    testers: 65,
    deadline: '2025-08-25',
    status: 'Open',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Explore a dark fantasy world filled with ancient mysteries and powerful artifacts.'
  },
  {
    id: 4,
    title: 'Drift Champions',
    developer: 'Speed Works',
    genre: 'Racing',
    testers: 40,
    deadline: '2025-09-05',
    status: 'Closing Soon',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A high-octane racing game focusing on precision drifting and vehicle customization.'
  }
];

const benefits = [
  'Early access to unreleased games',
  'Provide valuable feedback to developers',
  'Earn rewards and points for participation',
  'Influence the future development of games',
  'Connect with developers and other testers',
  'Exclusive forum access for testers',
  'Potential for permanent additions to your game library'
];

const GameTest = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [gamesRef, gamesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    document.title = 'Game Testing | Riyadah Elite';
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`py-32 bg-background relative overflow-hidden transition-opacity duration-1000 ${heroInView ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyberpunk-grid bg-[length:50px_50px] opacity-30"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase">Game Testing Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Shape the <span className="gradient-text">Future of Gaming</span>
            </h1>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Get early access to unreleased games, provide valuable feedback to developers,
              and earn rewards for your contributions as a game tester.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="#available-games" className="btn btn-primary">
                Available Games
              </Link>
              <Link to="#apply" className="btn btn-outline">
                Apply as Tester
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className={`py-20 bg-background-secondary transition-all duration-1000 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Benefits of Being a <span className="text-primary">Game Tester</span>
              </h2>
              <p className="text-neutral-300 mb-8">
                As a game tester at Riyadah Elite, you'll enjoy numerous benefits while 
                contributing to the development of amazing games. Your feedback helps 
                developers create better gaming experiences for everyone.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-success" />
                    </span>
                    <span className="text-neutral-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg blur-xl opacity-70"></div>
              <div className="relative z-10 rounded-lg overflow-hidden border border-neutral-700 shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/7915575/pexels-photo-7915575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Game Testing" 
                  className="w-full h-auto"
                />
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
          </div>
        </div>
      </section>

      {/* Available Games Section */}
      <section 
        id="available-games"
        ref={gamesRef}
        className={`py-20 transition-all duration-1000 ${gamesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-secondary">Games</span> Available for Testing
          </h2>
          
          <div className="flex border-b border-neutral-700 mb-8">
            <button
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'available' ? 'text-secondary border-b-2 border-secondary' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setActiveTab('available')}
            >
              Available Now
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'upcoming' ? 'text-secondary border-b-2 border-secondary' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Tests
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'completed' ? 'text-secondary border-b-2 border-secondary' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Tests
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableGames.map((game) => {
              const deadline = new Date(game.deadline);
              const formattedDate = deadline.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              return (
                <div 
                  key={game.id} 
                  className="card overflow-hidden hover:border-secondary/50 transition-all duration-300"
                >
                  <div className="relative">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      game.status === 'Open' 
                        ? 'bg-success/30 text-success border border-success/30' 
                        : 'bg-warning/30 text-warning border border-warning/30'
                    }`}>
                      {game.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-sm text-neutral-400 mb-3">{game.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-neutral-400">
                        <span className="text-neutral-300 font-medium">Developer:</span> {game.developer}
                      </p>
                      <p className="text-sm text-neutral-400">
                        <span className="text-neutral-300 font-medium">Genre:</span> {game.genre}
                      </p>
                      <p className="text-sm text-neutral-400">
                        <span className="text-neutral-300 font-medium">Current Testers:</span> {game.testers}
                      </p>
                      <p className="text-sm flex items-center text-neutral-400">
                        <Clock size={14} className="mr-1" />
                        <span className="text-neutral-300 font-medium">Deadline:</span> {formattedDate}
                      </p>
                    </div>
                    
                    <Link 
                      to={`/game-test/${game.id}`} 
                      className="btn btn-sm btn-secondary w-full"
                    >
                      Apply to Test
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section 
        id="apply"
        ref={formRef}
        className={`py-20 bg-background-secondary transition-all duration-1000 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Apply as a <span className="text-primary">Game Tester</span>
            </h2>
            <p className="text-neutral-400 text-center mb-8">
              Fill out the form below to join our game testing program. We'll review your application 
              and get back to you with more information.
            </p>
            
            <div className="card border-primary/30">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300 mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                      placeholder="Your email address" 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-neutral-300 mb-1">
                    Gaming Experience
                  </label>
                  <select 
                    id="experience" 
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  >
                    <option value="" disabled selected>Select your experience level</option>
                    <option value="beginner">Beginner (1-2 years)</option>
                    <option value="intermediate">Intermediate (3-5 years)</option>
                    <option value="experienced">Experienced (5-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Preferred Game Genres (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Action</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Adventure</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>RPG</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>FPS</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Strategy</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Simulation</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Sports</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Racing</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Puzzle</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-neutral-300 mb-1">
                    Primary Gaming Platform
                  </label>
                  <select 
                    id="platform" 
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  >
                    <option value="" disabled selected>Select your primary platform</option>
                    <option value="pc">PC</option>
                    <option value="playstation">PlayStation</option>
                    <option value="xbox">Xbox</option>
                    <option value="nintendo">Nintendo Switch</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-neutral-300 mb-1">
                    Why do you want to be a game tester?
                  </label>
                  <textarea 
                    id="motivation" 
                    rows={4}
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                    placeholder="Tell us why you're interested in game testing and what you can bring to the program"
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input 
                      id="terms" 
                      type="checkbox" 
                      className="form-checkbox text-primary" 
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-neutral-300">
                      I agree to the <a href="#" className="text-primary hover:text-primary-light">Terms and Conditions</a> and <a href="#" className="text-primary hover:text-primary-light">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 pt-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    Submit Application
                  </button>
                  <p className="text-sm text-neutral-400">
                    <AlertCircle size={14} className="inline mr-1" />
                    We typically respond within 2-3 business days
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameTest;