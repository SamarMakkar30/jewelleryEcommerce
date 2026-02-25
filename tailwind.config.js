/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFEF9",
        cream: "#FDF8F0",
        blush: "#F5EDE4",
        "blush-dark": "#E8D5C4",
        gold: {
          light: "#D4AF37",
          DEFAULT: "#C5A028",
          dark: "#B8860B",
          muted: "rgba(212, 175, 55, 0.15)",
        },
        neutral: {
          50: "#FAFAF8",
          100: "#F5F5F0",
          200: "#E8E8E0",
          300: "#D4D4CC",
          400: "#A8A8A0",
          500: "#737370",
          600: "#525250",
          700: "#3D3D3B",
          800: "#2A2A28",
          900: "#1A1A18",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        display: ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-1": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "heading-2": ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "heading-3": ["1.5rem", { lineHeight: "1.35" }],
        "heading-4": ["1.25rem", { lineHeight: "1.45" }],
        body: ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.875rem", { lineHeight: "1.7" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.03em" }],
        overline: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      boxShadow: {
        "soft-xs": "0 1px 8px rgba(0, 0, 0, 0.02)",
        "soft-sm": "0 2px 15px rgba(0, 0, 0, 0.03)",
        soft: "0 4px 30px rgba(0, 0, 0, 0.03)",
        "soft-md": "0 8px 40px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 12px 50px rgba(0, 0, 0, 0.06)",
        "soft-xl": "0 20px 60px rgba(0, 0, 0, 0.08)",
        gold: "0 4px 30px rgba(212, 175, 55, 0.12)",
      },
      borderRadius: {
        soft: "0.625rem",
        softer: "1rem",
        pill: "100px",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right":
          "slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.04) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
