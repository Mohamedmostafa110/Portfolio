/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — values live in index.css (light + dark themes)
        base: "var(--color-base)",
        raised: "var(--color-raised)",
        overlay: "var(--color-overlay)",
        line: "var(--color-line)",
        fg: "var(--color-fg)",
        fgmuted: "var(--color-fg-muted)",
        accent: "var(--color-accent)",
        accentdeep: "var(--color-accent-deep)",
        // Fixed brand colors (accents that do not flip with theme)
        navy: {
          950: "#0B132B",
          900: "#0E1730",
          850: "#121D3C",
          800: "#172445",
          700: "#1E2F56",
          600: "#28406E",
        },
        gold: {
          DEFAULT: "#D6C6A8",
          soft: "#E4D8BF",
          deep: "#A68F62",
        },
        mist: "#E9ECF4",
        slateblue: "#8B96B8",
      },
      fontFamily: {
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: { shell: "72rem" },
      boxShadow: {
        card: "0 1px 2px rgba(11,19,43,0.06), 0 10px 30px rgba(11,19,43,0.10)",
        pop: "0 24px 60px rgba(11,19,43,0.35)",
      },
    },
  },
  plugins: [],
};
