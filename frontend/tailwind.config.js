import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // Custom animations
        wiggle: "wiggle 1s ease-in-out infinite",
        shake: "shake 1s ease-in-out infinite",
        moveRightLeft: "moveRightLeft 10s ease-in-out infinite", // New animation
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
        moveRightLeft: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(20px)" },
          "50%": { transform: "translateX(0)" },
          "75%": { transform: "translateX(-20px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
