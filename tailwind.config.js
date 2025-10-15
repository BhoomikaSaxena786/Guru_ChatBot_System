

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        // Define how the card fades in and moves up
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Define the horizontal movement for the error shake
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        },
        // Define the slow pulse for the logo
        'pulse-slow': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '.5' },
        }
      },
      animation: {
        // Register the keyframes as utility classes
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};