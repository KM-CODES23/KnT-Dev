/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0F1115',
          secondary: '#1A1D24',
        },
        brand: {
          orange: '#FF7A00',
          amber: '#FFA800',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
        code: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}