/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#121212',
        bgAccent: '#1E1E1E',
        textPrimary: '#F3F3F3',
        textAccent: '#A8A8A8',
      },
    },
  },
  plugins: [],
};
