/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01959F",
        secondary: "#FEEABC",
        "danger-border": "#F5B1B7",
        'danger-main': '#E11428',
        black: "#404040",
        success: "#43936C",
        'success-border': '#B8DBCA',
        neutral: "#FAFAFA",
        'neutral-40': '#E0E0E0'
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "move-to-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-200px)",
          },
          "100%": {
            opacity: "70",
            transform: "translateY(0)",
          },
        },
        "move-to-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(200px)",
          },
          "100%": {
            opacity: "70",
            transform: "translateY(0)",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(300px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "move-to-down": "move-to-down 0.5s",
        "move-to-up": "move-to-up 0.5s",
        "fade-in-left": "fade-in-left 0.5s ease-out",
      },
    },
    fontWeight: {
      bold: 700,
    },
    fontFamily: {
      sans: ["Nunito Sans"],
    },
    borderRadius: {
      sm: "8px",
      lg: "12px",
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
