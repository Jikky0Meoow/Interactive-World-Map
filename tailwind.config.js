/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f0ff',
          purple: '#b300ff',
          pink: '#ff00e5',
        },
        dark: {
          900: '#0a0a1a',
          800: '#11112a',
          700: '#1a1a3a',
        }
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
