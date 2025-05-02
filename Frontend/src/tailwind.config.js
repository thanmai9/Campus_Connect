/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],  theme: {
    extend: {
      screens: {
        xs: "360px", // Extra-small screens
        sm: "576px", // Small screens
        md: "768px", // Medium screens
        lg: "1200px", // Large screens
        xl: "2560px", // Extra-large screens
      },
    },
  },
  plugins: [],
}

