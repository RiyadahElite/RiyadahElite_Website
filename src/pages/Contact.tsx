import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Contact</span> Us
        </h1>
        <p className="text-neutral-300">
          Contact page is under development. Please check back soon for ways to get in touch with us.
        </p>
      </div>
    </div>
  );
};

export default Contact;