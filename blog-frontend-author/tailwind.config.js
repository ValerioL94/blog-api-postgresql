import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadein 0.5s ',
      },
    },
  },
  plugins: [],
};
