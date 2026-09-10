import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mac: {
          dark: "#1e1e1e",
          window: "#282828",
          sidebar: "#181818",
          border: "#3a3a3c",
          red: "#ff5f56",
          yellow: "#ffbd2e",
          green: "#27c93f",
          accent: "#0a84ff",
          muted: "#8e8e93",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: ['"New York"', "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ['"SF Mono"', "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "mac-window": "0 24px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "mac-card": "0 8px 32px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
