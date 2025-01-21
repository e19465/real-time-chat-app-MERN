import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // Add custom animations
        wiggle: "wiggle 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out infinite",
      },
      keyframes: {
        // Define keyframes for the custom animations
        wiggle: {
          "0%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(-3deg)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(0)" },
          "75%": { transform: "translateX(4px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [daisyui],
};
