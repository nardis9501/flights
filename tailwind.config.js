/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#D0571B",
        primaryTheme: "#342036",
        secondaryTheme: "#311433",
      },
    },
  },
  plugins: [],
};
