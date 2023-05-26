/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'def': '320px',
      // => @media (min-width: 0px) { ... }

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
      boxShadow: {
        'box': '0px 3px 8px 2px rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        'text': '0px 4px 2px rgba(0, 0, 0, 0.24)'
      },
      colors: {
        'dgreen': "#116D6E",
        'mgreen': "#321E1E",
        'lgreen': "#4E3636",
        'lyellow': "#CD1818",
        'custom-blue': '#25C3F5',
        'custom-blue-dark': '#1D9ED9',
      },
    },
    plugins: [],
  },
};
