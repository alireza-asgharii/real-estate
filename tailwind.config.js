/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "header-theme": "#5463FF",
        "footer-theme": "#10439F",
      },
      keyframes: {
        closeMenu: {
          "0%": { transform: "translate(0px)" },
          "100%": { transform: "translate(-600px)" },
        },
        openMenu: {
          "0%": { transform: "translate(-500px)" },
          "100%": { transform: "translate(0px)" },
        },
      },
      animation: {
        opneMenu: "openMenu 0.4s ease forwards",
        closeMenu: "closeMenu 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};
