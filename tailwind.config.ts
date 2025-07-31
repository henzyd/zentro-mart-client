import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
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
