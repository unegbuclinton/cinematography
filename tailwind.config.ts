import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080A",
        surface: {
          DEFAULT: "#0F0F14",
          elevated: "#16161D",
          highlight: "#1E1E26",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.06)",
          DEFAULT: "rgba(255, 255, 255, 0.12)",
          strong: "rgba(255, 255, 255, 0.24)",
        },
        text: {
          primary: "#F8F8FA",
          secondary: "#A1A1AA",
          muted: "#71717A",
          accent: "#D4AF37",
        },
        accent: {
          gold: "#C9A050",
          "gold-light": "#E5C887",
          "gold-dark": "#9E7B2F",
          film: "#E2E8F0",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      aspectRatio: {
        anamorphic: "2.39 / 1",
        widescreen: "16 / 9",
        standard: "4 / 3",
        vertical: "9 / 16",
        cinematic: "2.35 / 1",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 35s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
