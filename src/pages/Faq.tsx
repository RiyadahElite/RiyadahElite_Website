import { useEffect } from 'react';

const Faq = () => {
  useEffect(() => {
    document.title = 'FAQ | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Frequently Asked</span> Questions
        </h1>
        <p className="text-neutral-300">
          FAQ section is being compiled. Check back soon for answers to common questions.
        </p>
      </div>
    </div>
  );
};

export default Faq;