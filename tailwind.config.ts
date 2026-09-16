import type { Config } from "tailwindcss";

// Brand tokens extracted directly from the approved Ysidra Company Profile (Close page):
// Primary Indigo #2F3080, Neutral 01 #F2F2F5, Neutral 02 #D9DDE6, Accent Saffron #EB7C05
// Headline: Montserrat Bold. Body: Open Sans.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#2F3080",
          950: "#1B1C4D",
          900: "#242566",
          800: "#2F3080",
          700: "#3D3F9E",
          50: "#EEEEF8",
        },
        saffron: {
          DEFAULT: "#EB7C05",
          600: "#C96603",
          500: "#EB7C05",
          400: "#F5A03D",
          50: "#FDF1E3",
        },
        parchment: {
          DEFAULT: "#F2F2F5",
          100: "#F2F2F5",
          200: "#D9DDE6",
        },
        ink: "#1C2240",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-open-sans)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(28, 34, 64, 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
