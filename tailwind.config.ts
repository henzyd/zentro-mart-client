import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        app: "1600px",
        shop: "1300px",
      },
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        destructive: "var(--destructive)",
        ring: "var(--ring)",
        sidebar: "var(--sidebar)",
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
