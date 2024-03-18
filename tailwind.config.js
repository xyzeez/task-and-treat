/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'light-blue': '#CCD8FE',
      white: '#FFFFFF',
      black: '#000000',
      red: '#dc2626',
      ashe: '#F0F0F0',
    },
    extend: {
      fontFamily: {
        pop: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'start-bg': "url('../assets/images/bg-mobile.png')",
        'start-bg-desktop': "url('../assets/images/bg-desktop.png')",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
      },
    },
  },
  plugins: [],
};
