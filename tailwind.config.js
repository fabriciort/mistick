/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--color-cream)',
        'cream-dark': 'var(--color-cream-dark)',
        'mistick-black': 'var(--color-mistick-black)',
        'mistick-charcoal': 'var(--color-mistick-charcoal)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        'accent-light': 'var(--color-accent-light)',

        // Legacy aliases (compat)
        gold: 'var(--color-gold)',
        'gold-dark': 'var(--color-gold-dark)',
        'gold-light': 'var(--color-gold-light)',
        forest: 'var(--color-forest)',
        'forest-light': 'var(--color-forest-light)',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
}

