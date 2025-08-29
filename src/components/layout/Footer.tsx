import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Twitch, Github, Mail } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <Logo className="h-10 w-auto" />
              <span className="ml-3 text-xl font-heading font-bold gradient-text">RIYADAH ELITE</span>
            </Link>
            <p className="text-neutral-400 mb-4 max-w-md">
              Join the elite gaming community where players and developers unite. 
              Test games, compete in tournaments, and connect with like-minded gamers.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Twitch size={20} />
                <span className="sr-only">Twitch</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-200">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-neutral-400 hover:text-primary">Community</Link></li>
              <li><Link to="/game-test" className="text-neutral-400 hover:text-primary">Game Testing</Link></li>
              <li><Link to="/production" className="text-neutral-400 hover:text-primary">Game Production</Link></li>
              <li><Link to="/arena" className="text-neutral-400 hover:text-primary">Esports Arena</Link></li>
              <li><Link to="/tournaments" className="text-neutral-400 hover:text-primary">Tournaments</Link></li>
              <li><Link to="/rewards" className="text-neutral-400 hover:text-primary">Rewards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-200">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-neutral-400 hover:text-primary">FAQ</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-primary">Contact Us</Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary">Community Guidelines</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-200">Contact</h3>
            <p className="text-neutral-400 flex items-center mb-2">
              <Mail size={16} className="mr-2" /> support@riyadahelite.com
            </p>
            <div className="mt-6">
              <h4 className="text-md font-bold mb-2 text-neutral-200">Subscribe to Our Newsletter</h4>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 bg-background border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-neutral-200"
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            © {currentYear} Riyadah Elite. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-500 hover:text-primary text-sm">Terms</a>
            <a href="#" className="text-neutral-500 hover:text-primary text-sm">Privacy</a>
            <a href="#" className="text-neutral-500 hover:text-primary text-sm">Cookies</a>
            <a href="#" className="text-neutral-500 hover:text-primary text-sm">Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;