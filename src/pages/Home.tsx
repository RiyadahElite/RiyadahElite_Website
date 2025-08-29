import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TournamentPreview from '../components/home/TournamentPreview';
import GameTestingSection from '../components/home/GameTestingSection';
import CommunitySection from '../components/home/CommunitySection';
import CtaSection from '../components/home/CtaSection';

const Home = () => {
  useEffect(() => {
    document.title = 'Riyadah Elite | Gaming Platform';
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TournamentPreview />
      <GameTestingSection />
      <CommunitySection />
      <CtaSection />
    </div>
  );
};

export default Home;