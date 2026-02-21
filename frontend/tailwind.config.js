export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },
        accent: {
          coral: "#FF6B6B",
          orange: "#FF8C42",
          green: "#10B981",
          yellow: "#F59E0B",
        },
        background: {
          light: "#FAFAFA",
          dark: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};
