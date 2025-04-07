/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        white: "rgba(255, 255, 255, 1)",
        black: "rgba(0, 0, 0, 1)",
        transparent: "rgba(0, 0, 0, 0)",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%, 50% 50%" },
          "50%": { backgroundPosition: "100% 50%, 75% 50%" },
          "100%": { backgroundPosition: "0% 50%, 50% 50%" },
        },
        "aurora-after": {
          "0%": { backgroundPosition: "50% 50%, 0% 50%" },
          "50%": { backgroundPosition: "75% 50%, 100% 50%" },
          "100%": { backgroundPosition: "50% 50%, 0% 50%" },
        }
      },
      animation: {
        aurora: "aurora 15s linear infinite",
        "aurora-after": "aurora-after 12s linear infinite"
      },
    },
  },
  plugins: [],
} 