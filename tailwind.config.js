/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        50: "50px",
        55: "55px",
        100: "100px",
        320: "320px",
        480: "480px",
        555: "555px",
      },
    },
    colors: {
      green: "#047163",
      grey: "#1010101a",
      "light-grey": "#F5F5F5",
      red: "#E04934",
      white: "#FFFFFF",
    },
    fontFamily: {
      sans: ["Manrope, sans-serif", { fontFeatureSettings: '"cv11", "ss01"' }],
    },
  },
  plugins: [],
};
