/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B89B3", // Lavender Purple
        secondary: "#F58E88", // Soft Coral Pink
        background: "#FAF9F6", // Pearl White
        cta: "#5BBE9D", // Teal Green
        header: "#2E2E2E", // Charcoal Gray
        body: "#5F5F5F", // Warm Gray
        accent: "#DDBB7C", // Muted Gold
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
