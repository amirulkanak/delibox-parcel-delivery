export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '340px',
        tab: '834px',
        pc: '1320px',
      },
      fontFamily: {
        cabin: ['Cabin', 'serif'],
        outfit: ['Outfit', 'serif'],
      },
      colors: {
        'clr-primary-text': '#003973',
        'clr-primary2': '#003973',
        'clr-secondary-text': '#002c5f',
        'clr-primary': '#FFD84F',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [import('tailwindcss-animate')],
};
