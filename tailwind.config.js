/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0F',
          secondary: '#12121A'
        },
        primary: {
          DEFAULT: '#009DFF', // Main blue from logo
          light: '#33B1FF',
          dark: '#007ACC'
        },
        secondary: {
          DEFAULT: '#00BFFF', // Light blue accent
          light: '#33CCFF',
          dark: '#0099CC'
        },
        accent: {
          DEFAULT: '#00E1FF', // Brightest blue accent
          light: '#33E6FF',
          dark: '#00B4CC'
        },
        success: {
          DEFAULT: '#00E676',
          light: '#66FFAD',
          dark: '#00B35C'
        },
        warning: {
          DEFAULT: '#FFC107',
          light: '#FFD454',
          dark: '#CC9A05'
        },
        error: {
          DEFAULT: '#FF3D71',
          light: '#FF7A9E',
          dark: '#CC305A'
        },
        neutral: {
          100: '#FFFFFF',
          200: '#E4E4E7',
          300: '#C4C4CC',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B'
        }
      },
      fontFamily: {
        sans: ['Exo 2', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 157, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 157, 255, 0.8), 0 0 30px rgba(0, 191, 255, 0.6)' }
        }
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(to right, rgba(10, 10, 15, 0.8), rgba(10, 10, 15, 0.8)), url("/assets/images/hero-bg.jpg")',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'cyberpunk-grid': 'linear-gradient(rgba(0, 157, 255, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(0, 157, 255, 0.15) 1px, transparent 1px)'
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary.DEFAULT"), 0 0 20px rgba(0, 157, 255, 0.5)',
        'neon-blue': '0 0 5px theme("colors.secondary.DEFAULT"), 0 0 20px rgba(0, 191, 255, 0.5)',
        'neon-green': '0 0 5px theme("colors.accent.DEFAULT"), 0 0 20px rgba(0, 225, 255, 0.5)'
      }
    }
  },
  plugins: []
};