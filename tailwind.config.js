/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0E1526",
          panel: "#141D33",
          line: "#26304A",
        },
        moon: "#C9A876",
        ink: "#EDEAE2",
        dust: "#8B93A8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
