import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#ecfff4',
          100: '#d1ffe3',
          200: '#a8ffca',
          300: '#71f2a8',
          400: '#3bd385',
          500: '#18ae69',
          600: '#0c8950',
          700: '#0d6d43',
          800: '#0d5638',
          900: '#0d472f'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(8, 18, 30, 0.14)'
      }
    }
  },
  plugins: []
};

export default config;
