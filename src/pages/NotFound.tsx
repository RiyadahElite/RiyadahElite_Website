import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen py-32 bg-background flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span className="gradient-text">404</span>
        </h1>
        <p className="text-2xl text-neutral-300 mb-8">Page not found</p>
        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;