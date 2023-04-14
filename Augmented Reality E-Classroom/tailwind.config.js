/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Brand: "#7148fc",
        Darkest: "#0c121c",
        Dark: "#1e293b",
        Mid: "#b8bfc6",
        Light: "#d6dee7",
        Lightest: "#ffffff",
        Brand_2: "#7148fc",
      },
      fontFamily: {
        nunito: ['var(--font-nunito)', ...fontFamily.sans],
        nunito_sans: ['var(--font-nunito-sans)', ...fontFamily.sans],
      }

    },
  },
  plugins: [],
}
