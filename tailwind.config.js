/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dgreen: "#52734D",
        mgreen: "#91C788",
        lgreen: "#DDFFBC",
        lyellow: "#FEFFDE",
      },
    },
    plugins: [],
  },
};
