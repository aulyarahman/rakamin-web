/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01959F",
        black: "#404040",
        success: "#43936C",
        neutral: "#FAFAFA",
      },
    },
    fontWeight: {
      bold: 700,
    },
    fontFamily: {
      sans: ["Nunito Sans"],
    },
    borderRadius: {
      DEFAULT: "5px",
      sm: "8px",
      large: "12px",
      full: "9999px",
    },
    fontSize: {
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      base: "1rem",
      lg: "1.125rem",
      sm: "12px",
      xl: "1.25rem",
      xs: "0.75rem",
    },
    screens: {
      "2xl": "1536px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xl: "1280px",
    },
  },
};
