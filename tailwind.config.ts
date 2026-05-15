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
        'background': '#FFFFFF',
        'foreground': '#000000',
        'secondary': '#F5F5F5',
        'accent': '#222222',
      },
      fontFamily: {
        'sans': ['Hind Siliguri', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
