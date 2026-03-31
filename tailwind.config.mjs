/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark:    'var(--color-primary-dark)',
          light:   'var(--color-primary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
        },
        // Legacy aliases kept for backward compat
        terracotta: {
          DEFAULT: 'var(--color-terracotta)',
          light:   'var(--color-terracotta-light)',
          dark:    'var(--color-terracotta-dark)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          light:   'var(--color-gold-light)',
        },
        offwhite: 'var(--color-offwhite)',
      },
      fontFamily: {
        sans:      ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        body:      ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        serif:     ['var(--font-newsreader)', 'Georgia', 'serif'],
        signature: ['var(--font-signature)', 'cursive'],
      },
      borderRadius: {
        brand: 'var(--radius-brand)',
        card:  'var(--radius-card)',
        full:  'var(--radius-full)',
      },
      maxWidth: {
        site: 'var(--max-width)',
      },
      boxShadow: {
        soft:   'var(--shadow-soft)',
        hover:  'var(--shadow-hover)',
        accent: 'var(--shadow-accent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
