import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Mock tournament data
const tournaments = [
  {
    id: 1,
    title: 'Apex Legends Championship',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-09-15',
    prizePool: '$10,000',
    participants: '128',
    registrationEnds: '2025-09-10',
    isFeatured: true,
    type: 'competitive'
  },
  {
    id: 2,
    title: 'Fortnite Weekend Battle',
    image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-08-20',
    prizePool: '$5,000',
    participants: '256',
    registrationEnds: '2025-08-15',
    isFeatured: false,
    type: 'competitive'
  },
  {
    id: 3,
    title: 'League of Legends Casual Cup',
    image: 'https://images.pexels.com/photos/596750/pexels-photo-596750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-08-25',
    prizePool: 'For Fun',
    participants: '64',
    registrationEnds: '2025-08-23',
    isFeatured: false,
    type: 'casual'
  },
  {
    id: 4,
    title: 'Valorant Pro Series',
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-09-05',
    prizePool: '$7,500',
    participants: '32 Teams',
    registrationEnds: '2025-09-01',
    isFeatured: true,
    type: 'competitive'
  }
];

const TournamentCard = ({ tournament, index, isVisible }: { tournament: typeof tournaments[0], index: number, isVisible: boolean }) => {
  const { title, image, date, prizePool, participants, registrationEnds, type } = tournament;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const registrationDate = new Date(registrationEnds).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      className={`card overflow-hidden transition-all duration-700 transform hover:scale-[1.02] ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-t-xl" 
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            type === 'competitive' 
              ? 'bg-primary/30 text-primary border border-primary/30' 
              : 'bg-secondary/30 text-secondary border border-secondary/30'
          }`}>
            {type === 'competitive' ? 'Competitive' : 'Casual'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 line-clamp-1">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-neutral-400">
            <Calendar size={16} className="mr-2" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-400">
            <DollarSign size={16} className="mr-2" />
            <span>Prize: {prizePool}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-400">
            <Users size={16} className="mr-2" />
            <span>{participants} Participants</span>
          </div>
          <div className="flex items-center text-sm text-neutral-400">
            <Clock size={16} className="mr-2" />
            <span>Registration ends: {registrationDate}</span>
          </div>
        </div>
        
        <Link 
          to={`/tournaments/${tournament.id}`} 
          className="inline-flex items-center text-primary hover:text-primary-light font-medium"
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const TournamentPreview = () => {
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
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="gradient-text">Tournaments</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl">
              Compete in our upcoming tournaments to test your skills, have fun, and win prizes. 
              We offer both casual and competitive tournaments for players of all skill levels.
            </p>
          </div>
          <Link 
            to="/tournaments" 
            className="btn btn-outline mt-4 md:mt-0"
          >
            View All Tournaments
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tournaments.map((tournament, index) => (
            <TournamentCard 
              key={tournament.id} 
              tournament={tournament} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentPreview;