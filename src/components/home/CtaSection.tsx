import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-cyberpunk-grid opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Join the <span className="gradient-text">Elite?</span>
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Create your account now to access all features of Riyadah Elite. 
            Test games, join tournaments, connect with the community, and earn rewards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Account
            </Link>
            <Link to="/tournaments" className="btn btn-outline btn-lg">
              Browse Tournaments
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;