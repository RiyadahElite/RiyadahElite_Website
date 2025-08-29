import { Gamepad2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center">
        <div className="relative mb-4 mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse"></div>
          <Gamepad2 className="relative z-10 w-full h-full text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-heading font-bold gradient-text animate-pulse">
          LOADING
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;