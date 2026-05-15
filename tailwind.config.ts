import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#DA291C',
        'primary-dark': '#B81F14',
        'primary-light': '#E85A4F',
        'success': '#228848',
        'gold': '#C49A26',
        'background': '#F9F9F9',
        'surface': '#FFFFFF',
        'foreground': '#1A1A1A',
        'secondary': '#F5EFE8',
        'accent': '#222222',
        'border': '#E5E5E5',
        'muted': '#8B8B8B',
      },
      fontFamily: {
        'sans': ['Hind Siliguri', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'premium': '0 4px 14px rgba(218, 41, 28, 0.15)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'button': '0 4px 12px rgba(218, 41, 28, 0.25)',
        'modal': '0 10px 40px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(5rem, env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [],
}
export default config
