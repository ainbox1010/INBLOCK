/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBEA',
          100: '#FBF6D9',
          200: '#F7EDB3',
          300: '#F3E48D',
          400: '#EFDB67',
          500: '#EBD241',
          600: '#D4BC3B',
          700: '#A89230',
          800: '#7C6B24',
          900: '#504518'
        },
        carbon: {
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#808080',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131'
        }
      }
    },
  },
  plugins: [],
}

