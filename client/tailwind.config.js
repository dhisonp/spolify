/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      // sans: ["Inter", "sans-serif"],
      sans: ["Gantari", "sans-serif"],
      serif: ["Libre Caslon Text", "serif"],
      mono: ['"JetBrains Mono"', "mono"],
      display: ["Bebas Neue", "display"],
    },
    fontWeight: {
      bold: 700,
      medium: 500,
      semi: 600,
    },
    fontStyle: {
      italic: "italic",
    },
  },
  plugins: [],
};
