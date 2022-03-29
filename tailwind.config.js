module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        smm3: "360px",
        smm2: "400px",
        smm: "600px",
        // => @media (min-width: 640px) { ... }
        mdd: "768px",

        lgg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xll: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
  variants: {},
};
