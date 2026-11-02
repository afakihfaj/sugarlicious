/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          cream: '#FAF7F2',
          beige: '#F5ECE1',
          sand: '#ECE3D7',
          espresso: '#2A1B14',
          cocoa: '#4A372E',
          muted: '#7A685F',
          border: '#EADFD2',
          green: '#213B29',
          'green-dark': '#182C1F',
          'green-bg': '#19261C',
          gold: '#C88A3B',
          'gold-light': '#FDF3E7',
          butter: '#F5D77F'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -5px rgba(42, 27, 20, 0.08), 0 4px 12px -2px rgba(42, 27, 20, 0.04)',
        'warm-hover': '0 20px 35px -5px rgba(42, 27, 20, 0.12), 0 8px 16px -2px rgba(42, 27, 20, 0.06)',
        'glow': '0 0 25px rgba(200, 138, 59, 0.35)',
      }
    },
  },
  plugins: [],
}

