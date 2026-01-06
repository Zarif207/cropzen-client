import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      "light",
      {
        dark: {
          /* 🌿 Brand greens (keep identity) */
          primary: "#22c55e",
          secondary: "#16a34a",
          accent: "#4ade80",

          /* 🌘 Backgrounds — light dark, clean grey */
          "base-100": "#2b2f33",   // page background
          "base-200": "#343a40",   // cards
          "base-300": "#3e454b",   // borders / dividers

          /* 📝 Text — soft white */
          "base-content": "#e5e7eb",

          /* UI states */
          info: "#60a5fa",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#f87171",

          /* Navbar / footer */
          neutral: "#262a2e",
        },
      },
    ],
  },
};