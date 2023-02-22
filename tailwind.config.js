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
        100: "100px",
        120: "120px",
        150: "150px",
        300: "300px",
        320: "320px",
        480: "480px",
        500: "500px",
        640: "640px",
      },
    },
    colors: {
      mygreen: "#047163",
      mygrey: "#1010101a",
      mylightgrey: "#F5F5F5",
      myred: "#E04934",
      mywhite: "#FFFFFF",
    },
    fontFamily: {
      sans: ["Manrope, sans-serif", { fontFeatureSettings: '"cv11", "ss01"' }],
    },
  },
  plugins: [require("flowbite/plugin")],
};
