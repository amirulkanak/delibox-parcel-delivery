export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Custom media queries screen size
      screens: {
        xs: '340px',
        tab: '834px',
        pc: '1320px',
      },
      // Custom font family array, comma separated
      fontFamily: {
        cabin: ['Cabin', 'serif'],
        outfit: ['Outfit', 'serif'],
      },
      // Custom colors
      colors: {
        'text-clr-primary': '#003973',
        'clr-primary': '#FFD84F',
      },
    },
  },
  plugins: [],
};
