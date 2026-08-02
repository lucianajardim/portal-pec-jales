import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,tsx,mdx}',
    './components/**/*.{js,ts,tsx,mdx}',
    './app/**/*.{js,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1e3a5f',
          medium: '#2d6da8',
          light: '#4a90d9',
          bg: '#f5f7fa',
        },
      },
    },
  },
  plugins: [],
}
export default config
