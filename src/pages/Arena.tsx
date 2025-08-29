import { useEffect } from 'react';

const Arena = () => {
  useEffect(() => {
    document.title = 'Arena | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Arena</span> Coming Soon
        </h1>
        <p className="text-neutral-300">
          The Riyadah Elite Arena is under construction. Check back soon for exciting competitive gaming features.
        </p>
      </div>
    </div>
  );
};

export default Arena;