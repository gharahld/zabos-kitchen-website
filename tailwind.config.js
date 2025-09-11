/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F7941D",
          blue: "#1A73E8",
          yellow: "#FFC107",
          charcoal: "#1F2427",
          gray: "#8E959B",
          light: "#E5EBEE",
          white: "#FFFFFF",
        },
      },
      borderRadius: {
        card: "14px",
        pill: "9999px",
      },
      boxShadow: {
        food: "0 10px 20px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
