import { useEffect } from 'react';

const Tournaments = () => {
  useEffect(() => {
    document.title = 'Tournaments | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Tournaments</span> Coming Soon
        </h1>
        <p className="text-neutral-300">
          Exciting tournaments are being prepared. Stay tuned for competitive gaming opportunities.
        </p>
      </div>
    </div>
  );
};

export default Tournaments;