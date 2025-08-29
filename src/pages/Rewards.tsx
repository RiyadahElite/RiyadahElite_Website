import { useEffect } from 'react';

const Rewards = () => {
  useEffect(() => {
    document.title = 'Rewards | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Rewards</span> Coming Soon
        </h1>
        <p className="text-neutral-300">
          The rewards program is being finalized. Soon you'll be able to earn and redeem points for exclusive rewards.
        </p>
      </div>
    </div>
  );
};

export default Rewards;