import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FAF7F2",
        ivory: "#FFFFFF",
        sand: "#F1ECE1",
        borderWarm: "#E6DFD3",
        ink: "#18181B",
        muted: "#57534E",
        bronze: "#9A6B32",
        bronzeDark: "#7C5222",
        midnight: "#141B24",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-noto)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
