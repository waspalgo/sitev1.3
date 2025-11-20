import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-secondary': '#02010A',
        'bg-tertiary': '#050111',
        'purple-primary': '#6D28D9',
        'purple-secondary': '#8B5CF6',
        'purple-accent': '#A855F7',
        'text-primary': '#FFFFFF',
        'text-secondary': '#F3F4F6',
        'text-muted': '#9CA3AF',
        'positive': '#34D399',
        'negative': '#F87171',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(168, 85, 247, 0.25)',
        'glow-md': '0 0 25px rgba(168, 85, 247, 0.40)',
        'glow-lg': '0 0 40px rgba(168, 85, 247, 0.40)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'particle-1': 'particle-float-1 15s ease-in-out infinite',
        'particle-2': 'particle-float-2 20s ease-in-out infinite',
        'particle-3': 'particle-float-3 25s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'float-glow': 'float-glow 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.4' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.2' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.25)' },
          '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.50)' },
        },
        'particle-float-1': {
          '0%, 100%': { transform: 'translate(0, 0) translateX(0)', opacity: '0.3' },
          '25%': { transform: 'translate(20px, -30px) translateX(10px)', opacity: '0.5' },
          '50%': { transform: 'translate(-15px, -50px) translateX(-5px)', opacity: '0.2' },
          '75%': { transform: 'translate(10px, -20px) translateX(15px)', opacity: '0.4' },
        },
        'particle-float-2': {
          '0%, 100%': { transform: 'translate(0, 0) translateX(0)', opacity: '0.2' },
          '33%': { transform: 'translate(-25px, -40px) translateX(-10px)', opacity: '0.4' },
          '66%': { transform: 'translate(30px, -35px) translateX(20px)', opacity: '0.3' },
        },
        'particle-float-3': {
          '0%, 100%': { transform: 'translate(0, 0) translateX(0)', opacity: '0.25' },
          '50%': { transform: 'translate(15px, -45px) translateX(8px)', opacity: '0.45' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float-glow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '0.7' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
