import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "var(--font-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "#0052be",
          light: "#ebf3ff",
        },
        customBlack: "var(--black)",
        customGray: "var(--gray)",
        navyBlue: "var(--navyBlue)",
      },
      boxShadow: {
        floating: "0 20px 40px -15px rgba(13, 26, 73, 0.12), 0 0 15px rgba(0, 103, 237, 0.08)",
        glow: "0 0 25px -5px rgba(0, 103, 237, 0.4)",
        card: "0 10px 30px -10px rgba(2, 6, 13, 0.06)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
