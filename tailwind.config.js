/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    colors: {
      red: '#B9464B',
      green: '#3C5B56',
      yellow: '#F3EBAC',
      white: '#ffffff',
      black: '#000000'
    }
  },
  plugins: [],
}