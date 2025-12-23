/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    extend: {
      colors: {
        primary: "#8B1313",
        primaryHover: "#6E0F0F",

        primaryDark: "#420904",
        primaryDarkHover: "#300702",

        secondary: "#F2F2F2",
        secondaryHover: "#E4E4E4",

        darkPrimary: "#C44545",
        darkPrimaryHover: "#A63A3A",

        darkPrimaryDark: "#7A3129",
        darkPrimaryDarkHover: "#662822",

        darkSecondary: "#1E1E1E",
        darkSecondaryHover: "#2A2A2A",
      },

      backgroundImage: {
        gradient:
          "linear-gradient(to bottom, #333333 10%, #8b1313 80%, #8b1313 90%)",
      },

      keyframes: {
        shine: {
          "0%": { left: "-75%" },
          "50%": { left: "100%" },
          "100%": { left: "125%" },
        },
      },
      animation: {
        shine: "shine 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
