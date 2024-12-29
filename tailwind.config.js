/** @type {import('tailwindcss').Config} */
import twBorderPlugin from "./app/plugins/tw-border-plugin";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    twBorderPlugin({
      debug: process.env.NODE_ENV === "development",
    }),
  ],
};
