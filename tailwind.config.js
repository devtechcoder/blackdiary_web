module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        laaldiary: {
          bg: "#121212",
          contentBg: "#181818",
          hover: "#282828",
          border: "#2a2a2a",
          text: "#ffffff",
          muted: "#b3b3b3",
          green: "#1DB954",
        },
      },

      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
