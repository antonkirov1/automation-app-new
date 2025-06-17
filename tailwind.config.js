const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      dark: {
        colors: {
          background: "#0D1117",
          foreground: "#C9D1D9",
          primary: {
            50: "#EBF8FF",
            100: "#BEE3F8",
            200: "#90CDF4",
            300: "#63B3ED",
            400: "#4299E1",
            500: "#3182CE",
            600: "#2B77CB",
            700: "#2C5AA0",
            800: "#2A4365",
            900: "#1A365D",
            DEFAULT: "#3182CE",
            foreground: "#ffffff",
          },
          focus: "#3182CE",
        },
      },
    },
  })],
}