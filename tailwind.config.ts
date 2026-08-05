import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nb: {
          black: "#0D0907",
          charcoal: "#1A1210",
          cream: "#FBF9F6",
          "ember-dark": "#5C1A0E",
          ember: "#9E2B0E",
          flame: "#E0561B",
          gold: "#E8A33D",
          "gold-light": "#F3C878",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"], // Cormorant Garamond
        script: ["var(--font-script)", "cursive"], // Kaushan Script (estilo del logo)
        body: ["var(--font-body)", "sans-serif"], // Inter
      },
      letterSpacing: {
        wideish: "0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
