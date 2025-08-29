import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, message, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 text-neutral-400">
        {icon || <AlertCircle size={64} />}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-400 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;