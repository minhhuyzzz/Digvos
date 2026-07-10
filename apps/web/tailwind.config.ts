import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#5a96b0", // Màu chủ đạo của DIGVOS từ PRD
          50: "#f3f7f9",
          100: "#e4edf1",
          200: "#cedfe6",
          300: "#aac9d6",
          400: "#7da8be",
          500: "#5a96b0",
          600: "#497c96",
          700: "#3d647a",
          800: "#365567",
          900: "#314958",
          950: "#1d2e3b",
        }
      },
    },
  },
  plugins: [],
};
export default config;
