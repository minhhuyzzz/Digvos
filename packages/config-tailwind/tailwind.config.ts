import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#5a96b0",
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
