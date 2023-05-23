/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      '2xs': '0.6rem',
      'xs': '0.8rem',
      sm: '1rem',
      base: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.8rem',
      '3xl': '2rem',
      '4xl': '2.6rem',
      '5xl': '3.2rem',
      '6xl': '3.8rem',
    },
    extend: {
      colors: {
        'dgreen': "#52734D",
        'mgreen': "#91C788",
        'lgreen': "#DDFFBC",
        'lyellow': "#FEFFDE",
      },
    },
    plugins: [],
  },
};
