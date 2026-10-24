/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0D0D0D",
          dark: "#141414",
          charcoal: "#1F1F1F",
          muted: "#1F1F1F",
          lightMuted: "#2B2B2B",
          border: "#E5E1D8",
          cream: "#FAF8F5",
          sand: "#F4EFEA",
          beige: "#EAE3D2",
          warmBeige: "#D8CBB5",
          gold: "#C5A880",
          goldDark: "#A48256",
          white: "#FFFFFF"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widestLuxe: '0.25em',
        ultraLuxe: '0.35em',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(17, 17, 17, 0.05)',
        'luxe': '0 10px 30px -4px rgba(17, 17, 17, 0.08)',
        'card': '0 2px 12px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
