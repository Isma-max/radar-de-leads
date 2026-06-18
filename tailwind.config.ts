import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-text)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        wemul: {
          coral: "var(--wemul-coral)",
          blue: "var(--wemul-blue)",
          navy: "var(--wemul-navy)",
          sky: "var(--wemul-sky)",
          white: "var(--wemul-white)",
          black: "var(--wemul-black)",
        },
        coral: {
          50: "var(--coral-50)",
          100: "var(--coral-100)",
          200: "var(--coral-200)",
          300: "var(--coral-300)",
          400: "var(--coral-400)",
          500: "var(--coral-500)",
          600: "var(--coral-600)",
          700: "var(--coral-700)",
          800: "var(--coral-800)",
          900: "var(--coral-900)",
        },
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },
        navy: {
          50: "var(--navy-50)",
          100: "var(--navy-100)",
          200: "var(--navy-200)",
          300: "var(--navy-300)",
          400: "var(--navy-400)",
          500: "var(--navy-500)",
          600: "var(--navy-600)",
          700: "var(--navy-700)",
          800: "var(--navy-800)",
          900: "var(--navy-900)",
        },
        ink: {
          0: "var(--ink-0)",
          25: "var(--ink-25)",
          50: "var(--ink-50)",
          100: "var(--ink-100)",
          200: "var(--ink-200)",
          300: "var(--ink-300)",
          400: "var(--ink-400)",
          500: "var(--ink-500)",
          600: "var(--ink-600)",
          700: "var(--ink-700)",
          800: "var(--ink-800)",
          900: "var(--ink-900)",
        },
      },
      borderRadius: {
        card: "var(--radius-card)",
        "wemul-lg": "var(--radius-lg)",
        "wemul-md": "var(--radius-md)",
        "wemul-sm": "var(--radius-sm)",
      },
      boxShadow: {
        "wemul-sm": "var(--shadow-sm)",
        "wemul-md": "var(--shadow-md)",
        "wemul-lg": "var(--shadow-lg)",
        "wemul-coral": "var(--shadow-coral)",
        "wemul-blue": "var(--shadow-blue)",
      },
    },
  },
  plugins: [],
};

export default config;
