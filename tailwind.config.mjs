/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01306E",
        secondary: "#01306E",
      },
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        barlow: ["Barlow", "sans-serif"],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        sans: ["Helvetica", "Arial", "sans-serif"],
        bonvivant: ["BonVivant", ...defaultTheme.fontFamily.sans],
        bonvivantSerif: ["BonVivantSerif", ...defaultTheme.fontFamily.sans],
        bonvivantSerifBold: [
          "BonVivantSerifBold",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      gridTemplateColumns: {
        banner: "1.5fr 1fr 0.6fr",
        services: "1fr 1.4fr",
        services2: "1fr 1fr",
        testimonial:" 0.4fr 2fr "
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
