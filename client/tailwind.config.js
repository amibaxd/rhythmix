/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /(bg|text|border|decoration|from|via|accent)-(neon|cosmic|vibrant)/,
      variants: ["hover", "focus", "active"],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        groove: ["Orbitron", "monospace"],
        "groove-light": ["Exo 2", "sans-serif"],
        "groove-bold": ["Audiowide", "cursive"],
      },
      colors: {
        primary: "#0a0a0f",
        secondary: {
          100: "#1a1a2e",
          200: "#16213e",
          300: "#0f3460",
        },
        neon: {
          DEFAULT: "#00ff88",
          50: "#00ffaa",
          100: "#00ffcc",
          200: "#00ffee",
        },
        cosmic: {
          DEFAULT: "#ff0080",
          50: "#ff1a8c",
          100: "#ff3399",
          200: "#ff4da6",
        },
        vibrant: {
          DEFAULT: "#ff6b35",
          50: "#ff7a4a",
          100: "#ff895f",
          200: "#ff9874",
        },
        electric: {
          DEFAULT: "#4facfe",
          50: "#63b8fe",
          100: "#78c2fe",
          200: "#8dccfe",
        },
        midnight: {
          DEFAULT: "#2d1b69",
          50: "#3d1f7a",
          100: "#4d238b",
          200: "#5d279c",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-glow": "linear-gradient(45deg, #00ff88, #00ffcc, #4facfe)",
        "cosmic-glow": "linear-gradient(45deg, #ff0080, #ff6b35, #4facfe)",
        "vibrant-glow": "linear-gradient(45deg, #ff6b35, #ff0080, #00ff88)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88",
          },
          "100%": {
            boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
