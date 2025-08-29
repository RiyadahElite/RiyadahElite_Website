import { useEffect } from 'react';

const AdminPanel = () => {
  useEffect(() => {
    document.title = 'Admin Panel | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Admin</span> Panel
        </h1>
        <p className="text-neutral-300">
          Admin panel is under construction. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;