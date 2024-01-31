module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        upDown: {
          '0%, 100%': {
            transform:
              'translateY(0)'
          },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        upDown: 'upDown 1s ease-in-out infinite',
      },
      colors: {
        'primaryBlue': {
          500: '#191847',
          400: '#221F84',
          300: '#3A36B9',
          200: '#556BDC',
          100: '#95A5FB',
          50: '#C2CBFF'
        }
      }
    },
  },
  plugins: [],
};

