// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // or false if you don’t want dark mode at all
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",      // ✅ Page Router lives here
      "./components/**/*.{js,ts,jsx,tsx}", // ✅ Your shared components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  