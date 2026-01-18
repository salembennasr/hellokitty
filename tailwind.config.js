/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hk-pink': {
          50: '#FFF5F7',
          100: '#FFE8ED',
          200: '#FFB6C1',
          300: '#FF8FA3',
          400: '#FF6B8A',
          500: '#FF4D6D',
          600: '#E4002B',
        },
        'hk-blue': {
          100: '#E8F4F8',
          200: '#A8D8EA',
          300: '#72BCD4',
        },
        'hk-purple': {
          100: '#F3E8FF',
          200: '#D8B4FE',
          300: '#9B59B6',
        },
        'hk-yellow': {
          100: '#FFF9E6',
          200: '#FFE566',
          300: '#FFD93D',
        },
      },
      borderRadius: {
        'hk': '1rem',
        'hk-lg': '1.5rem',
        'hk-xl': '2rem',
      },
      fontFamily: {
        'cute': ['Nunito', 'Comic Sans MS', 'sans-serif'],
      },
      boxShadow: {
        'hk': '0 4px 14px 0 rgba(255, 107, 138, 0.25)',
        'hk-lg': '0 10px 40px 0 rgba(255, 107, 138, 0.3)',
      },
    },
  },
  plugins: [],
}
