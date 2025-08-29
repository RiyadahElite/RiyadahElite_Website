import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Code, Users, Star, ChevronRight, AlertCircle, Check } from 'lucide-react';

// Mock game submissions
const gameSubmissions = [
  {
    id: 1,
    title: 'Nebula Ascent',
    developer: 'Stellar Studios',
    genre: 'Sci-Fi RPG',
    status: 'In Testing',
    testers: 120,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A sci-fi RPG set in a distant galaxy where players navigate political intrigue and cosmic threats.'
  },
  {
    id: 2,
    title: 'Tactical Legends',
    developer: 'Strategy Masters',
    genre: 'Tactical Shooter',
    status: 'Approved',
    testers: 85,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A team-based tactical shooter with unique character abilities and strategic gameplay.'
  },
  {
    id: 3,
    title: 'Shadow Realms',
    developer: 'Mystic Games',
    genre: 'Action Adventure',
    status: 'Under Review',
    testers: 0,
    rating: 0,
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Explore a dark fantasy world filled with ancient mysteries and powerful artifacts.'
  }
];

const benefits = [
  'Access to our game testing community',
  'Professional feedback from experienced testers',
  'Analytics and player behavior insights',
  'Marketing support for approved games',
  'Integration with our tournament platform',
  'Developer community access',
  'Promotional opportunities'
];

const Production = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submissionsRef, submissionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    document.title = 'Game Production | Riyadah Elite';
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
              <span className="text-xs font-semibold tracking-wider uppercase">Game Production Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Submit Your Game for <span className="gradient-text">Testing</span>
            </h1>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Get valuable feedback from our community of testers, improve your game,
              and reach a wider audience through our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="#submit-game" className="btn btn-primary">
                Submit Your Game
              </Link>
              <Link to="#submissions" className="btn btn-outline">
                View Submissions
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
                Benefits for <span className="text-primary">Developers</span>
              </h2>
              <p className="text-neutral-300 mb-8">
                Submit your game to our platform and get access to a wide range of benefits
                that will help you improve and promote your game.
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
                  alt="Game Development" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 p-4 bg-background-secondary rounded-lg border border-neutral-700 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Code className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">50+ Games</p>
                    <p className="text-xs text-neutral-400">Successfully Launched</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Submissions Section */}
      <section 
        id="submissions"
        ref={submissionsRef}
        className={`py-20 transition-all duration-1000 ${submissionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-secondary">Game</span> Submissions
          </h2>
          
          <div className="flex border-b border-neutral-700 mb-8">
            <button
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'submissions' ? 'text-secondary border-b-2 border-secondary' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setActiveTab('submissions')}
            >
              Active Submissions
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'approved' ? 'text-secondary border-b-2 border-secondary' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setActiveTab('approved')}
            >
              Approved Games
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'completed' ? 'text-secondary border-b-2 border-secondary' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Testing
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameSubmissions.map((game) => (
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
                    game.status === 'Approved' 
                      ? 'bg-success/30 text-success border border-success/30'
                      : game.status === 'In Testing'
                      ? 'bg-primary/30 text-primary border border-primary/30'
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
                      <span className="text-neutral-300 font-medium">Testers:</span> {game.testers}
                    </p>
                    {game.rating > 0 && (
                      <p className="text-sm flex items-center text-neutral-400">
                        <Star size={14} className="mr-1 text-warning" />
                        <span className="text-neutral-300 font-medium">Rating:</span> {game.rating}/5.0
                      </p>
                    )}
                  </div>
                  
                  <Link 
                    to={`/production/games/${game.id}`} 
                    className="btn btn-sm btn-secondary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Game Form Section */}
      <section 
        id="submit-game"
        ref={formRef}
        className={`py-20 bg-background-secondary transition-all duration-1000 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Submit Your <span className="text-primary">Game</span>
            </h2>
            <p className="text-neutral-400 text-center mb-8">
              Fill out the form below to submit your game for testing. Our team will review 
              your submission and get back to you within 2-3 business days.
            </p>
            
            <div className="card border-primary/30">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gameTitle" className="block text-sm font-medium text-neutral-300 mb-1">
                      Game Title
                    </label>
                    <input 
                      type="text" 
                      id="gameTitle" 
                      className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                      placeholder="Enter game title" 
                    />
                  </div>
                  <div>
                    <label htmlFor="developer" className="block text-sm font-medium text-neutral-300 mb-1">
                      Developer/Studio Name
                    </label>
                    <input 
                      type="text" 
                      id="developer" 
                      className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                      placeholder="Your name or studio name" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="genre" className="block text-sm font-medium text-neutral-300 mb-1">
                    Game Genre
                  </label>
                  <select 
                    id="genre" 
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  >
                    <option value="" disabled selected>Select game genre</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="rpg">RPG</option>
                    <option value="strategy">Strategy</option>
                    <option value="simulation">Simulation</option>
                    <option value="sports">Sports</option>
                    <option value="racing">Racing</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">
                    Game Description
                  </label>
                  <textarea 
                    id="description" 
                    rows={4}
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                    placeholder="Describe your game, its unique features, and target audience"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-neutral-300 mb-1">
                    Target Platforms
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>PC (Windows)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>PC (Mac)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>PC (Linux)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Mobile (iOS)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Mobile (Android)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-neutral-300">
                      <input type="checkbox" className="form-checkbox text-primary" />
                      <span>Web Browser</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="development" className="block text-sm font-medium text-neutral-300 mb-1">
                    Development Stage
                  </label>
                  <select 
                    id="development" 
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                  >
                    <option value="" disabled selected>Select development stage</option>
                    <option value="prototype">Prototype</option>
                    <option value="alpha">Alpha</option>
                    <option value="beta">Beta</option>
                    <option value="release">Release Candidate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-neutral-300 mb-1">
                    Game Website/Social Media (Optional)
                  </label>
                  <input 
                    type="url" 
                    id="website" 
                    className="w-full px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                    placeholder="https://" 
                  />
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
                    Submit Game
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

export default Production;