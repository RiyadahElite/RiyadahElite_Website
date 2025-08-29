import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'bg-background-secondary border border-neutral-700 text-neutral-200',
        duration: 4000,
        style: {
          background: '#12121A',
          color: '#E4E4E7',
        },
        success: {
          iconTheme: {
            primary: '#00E676',
            secondary: '#12121A',
          },
        },
        error: {
          iconTheme: {
            primary: '#FF3D71',
            secondary: '#12121A',
          },
        },
      }}
    />
  );
};

export default Toast;