import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1E2761',
          50: '#E8EAF2',
          100: '#C5CAE0',
          200: '#9BA4C7',
          300: '#717EAE',
          400: '#4F5D99',
          500: '#1E2761',
          600: '#1A224F',
          700: '#151C3E',
          800: '#10152D',
          900: '#0B0F1C',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          50: '#ECFDF9',
          100: '#D1FAF1',
          200: '#A7F3E3',
          300: '#6EE7D4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
