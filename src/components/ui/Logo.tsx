import { Gamepad2 } from 'lucide-react';

interface LogoProps {
  className?: string;
  showIcon?: boolean;
}

const Logo = ({ className = "h-8 w-auto", showIcon = true }: LogoProps) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      {showIcon && (
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse-slow">
              <div className="bg-primary/30 rounded-full w-full h-full absolute blur-md"></div>
            </div>
          </div>
          <img 
            src="/assets/images/RE_Logo.png" 
            alt="Riyadah Elite Logo" 
            className="relative z-10 w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Logo;