import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--iron-bg)',
        foreground: 'var(--iron-cream)',
        primary: {
          DEFAULT: 'var(--iron-orange)',
          foreground: 'var(--iron-cream)',
        },
        secondary: {
          DEFAULT: 'var(--iron-surface)',
          foreground: 'var(--iron-cream)',
        },
        muted: {
          DEFAULT: 'var(--iron-muted)',
          foreground: 'var(--iron-muted)',
        },
        accent: {
          DEFAULT: 'var(--iron-elevated)',
          foreground: 'var(--iron-cream)',
        },
        border: 'var(--iron-border)',
        input: 'var(--iron-border)',
        ring: 'var(--iron-orange)',
      },
    },
  },
  plugins: [],
}
export default config
