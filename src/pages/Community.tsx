import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Video, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Mock forum topics
const forumTopics = [
  { id: 1, title: 'Tips for improving in competitive FPS games', replies: 24, author: 'ProGamer23', lastActivity: '2 hours ago' },
  { id: 2, title: 'Upcoming indie games to watch in 2025', replies: 18, author: 'IndieHunter', lastActivity: '5 hours ago' },
  { id: 3, title: 'Tournament strategy discussion', replies: 32, author: 'StratMaster', lastActivity: '1 day ago' },
  { id: 4, title: 'Best hardware for competitive gaming', replies: 45, author: 'TechGeek', lastActivity: '3 days ago' },
  { id: 5, title: 'Looking for team members for upcoming tournament', replies: 12, author: 'TeamCaptain', lastActivity: '6 hours ago' }
];

// Mock teams
const teams = [
  { id: 1, name: 'Phoenix Rising', members: 5, game: 'Valorant', openPositions: 1 },
  { id: 2, name: 'Shadow Wolves', members: 4, game: 'Apex Legends', openPositions: 1 },
  { id: 3, name: 'Elite Dragons', members: 6, game: 'League of Legends', openPositions: 0 },
  { id: 4, name: 'Tactical Force', members: 3, game: 'Counter-Strike 2', openPositions: 2 }
];

// Mock streams
const streams = [
  { id: 1, title: 'Tournament Finals - Live', streamer: 'EliteStreamer', viewers: 1240, game: 'Valorant', thumbnail: 'https://images.pexels.com/photos/7915577/pexels-photo-7915577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 2, title: 'Pro Player Game Testing', streamer: 'GameTester', viewers: 876, game: 'Unreleased RPG', thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 3, title: 'Community Game Night', streamer: 'CommunityMod', viewers: 650, game: 'Various', thumbnail: 'https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
];

const Community = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [forumsRef, forumsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamsRef, teamsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [streamsRef, streamsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    document.title = 'Community | Riyadah Elite';
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
              <span className="text-xs font-semibold tracking-wider uppercase">Riyadah Elite Community</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connect with Fellow <span className="gradient-text">Gamers</span>
            </h1>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join discussions, find teammates, watch streams, and become part of our 
              thriving gaming community. Share experiences and grow together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card text-center group hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-all duration-300">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Forums & Discussions</h3>
              <p className="text-neutral-400 mb-4">
                Engage in discussions about games, strategies, and the latest gaming news.
              </p>
              <Link 
                to="#forums" 
                className="inline-flex items-center text-primary hover:text-primary-light font-medium"
              >
                Browse Forums
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="card text-center group hover:border-secondary/50 transition-all duration-300">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/30 transition-all duration-300">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Team Formation</h3>
              <p className="text-neutral-400 mb-4">
                Find teammates for tournaments, create or join a clan, and build lasting relationships.
              </p>
              <Link 
                to="#teams" 
                className="inline-flex items-center text-secondary hover:text-secondary-light font-medium"
              >
                Find Teams
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="card text-center group hover:border-accent/50 transition-all duration-300">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-all duration-300">
                <Video className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Streams</h3>
              <p className="text-neutral-400 mb-4">
                Watch tournaments, game testing sessions, and connect with streamers.
              </p>
              <Link 
                to="#streams" 
                className="inline-flex items-center text-accent hover:text-accent-light font-medium"
              >
                Watch Streams
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Forums Section */}
      <section 
        id="forums" 
        ref={forumsRef}
        className={`py-20 bg-background-secondary transition-all duration-1000 ${forumsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-primary">Forums</span> & Discussions
              </h2>
              <p className="text-neutral-400 max-w-2xl">
                Join conversations about your favorite games, strategies, and gaming news.
                Share your experiences and learn from other community members.
              </p>
            </div>
            <Link 
              to="/community/forums" 
              className="btn btn-outline mt-4 md:mt-0"
            >
              All Topics
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-4 px-4 text-neutral-300 font-semibold">Topic</th>
                  <th className="text-center py-4 px-4 text-neutral-300 font-semibold">Replies</th>
                  <th className="text-left py-4 px-4 text-neutral-300 font-semibold">Author</th>
                  <th className="text-left py-4 px-4 text-neutral-300 font-semibold">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {forumTopics.map((topic, index) => (
                  <tr 
                    key={topic.id} 
                    className="border-b border-neutral-800 hover:bg-background/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4">
                      <Link to={`/community/forums/${topic.id}`} className="text-neutral-200 hover:text-primary font-medium">
                        {topic.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-center text-neutral-400">{topic.replies}</td>
                    <td className="py-4 px-4 text-neutral-400">{topic.author}</td>
                    <td className="py-4 px-4 text-neutral-400">{topic.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link to="/community/forums/new" className="btn btn-primary">
              Start New Discussion
            </Link>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section 
        id="teams" 
        ref={teamsRef}
        className={`py-20 transition-all duration-1000 ${teamsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-secondary">Team</span> Formation
              </h2>
              <p className="text-neutral-400 max-w-2xl">
                Find teammates for tournaments, create or join a clan, and build lasting gaming relationships.
                Form the perfect team to dominate in competitions.
              </p>
            </div>
            <Link 
              to="/community/teams" 
              className="btn btn-outline mt-4 md:mt-0"
            >
              All Teams
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div 
                key={team.id} 
                className="card hover:border-secondary/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{team.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-neutral-400">
                    <span className="text-neutral-300 font-medium">Game:</span> {team.game}
                  </p>
                  <p className="text-sm text-neutral-400">
                    <span className="text-neutral-300 font-medium">Members:</span> {team.members}
                  </p>
                  <p className="text-sm text-neutral-400">
                    <span className="text-neutral-300 font-medium">Open Positions:</span> {team.openPositions}
                  </p>
                </div>
                <Link 
                  to={`/community/teams/${team.id}`} 
                  className="inline-flex items-center text-secondary hover:text-secondary-light font-medium"
                >
                  Team Details
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/community/teams/create" className="btn btn-secondary mr-4">
              Create Team
            </Link>
            <Link to="/community/teams/find" className="btn btn-outline">
              Find Team
            </Link>
          </div>
        </div>
      </section>

      {/* Streams Section */}
      <section 
        id="streams" 
        ref={streamsRef}
        className={`py-20 bg-background-secondary transition-all duration-1000 ${streamsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-accent">Live</span> Streams
              </h2>
              <p className="text-neutral-400 max-w-2xl">
                Watch tournaments, game testing sessions, and connect with streamers.
                Stay updated with live events and exclusive content.
              </p>
            </div>
            <Link 
              to="/community/streams" 
              className="btn btn-outline mt-4 md:mt-0"
            >
              All Streams
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {streams.map((stream) => (
              <div 
                key={stream.id} 
                className="card overflow-hidden hover:border-accent/50 transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="absolute top-2 right-2 bg-error/80 px-2 py-1 rounded text-xs font-semibold">
                    LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                    {stream.viewers.toLocaleString()} viewers
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{stream.title}</h3>
                  <p className="text-sm text-neutral-400 mb-2">
                    <span className="text-neutral-300 font-medium">Streamer:</span> {stream.streamer}
                  </p>
                  <p className="text-sm text-neutral-400 mb-4">
                    <span className="text-neutral-300 font-medium">Game:</span> {stream.game}
                  </p>
                  <Link 
                    to={`/community/streams/${stream.id}`} 
                    className="btn btn-sm btn-accent w-full"
                  >
                    Watch Stream
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/community/streams/schedule" className="btn btn-accent">
              Streaming Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;