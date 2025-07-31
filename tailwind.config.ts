import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
      },
      maxWidth: {
        App: "1300px",
      },
      screens: {
        xsMobile: "320px",
        smMobile: "375px",
        mdMobile: "425px",
        lgMobile: "545px",
        smTablet: "768px",
        mdTablet: "900px",
        lgTablet: "1024px",
        laptop: "1440px",
        lgLaptop: "1536px",
      },
    },
  },
  plugins: [],
} satisfies Config;
