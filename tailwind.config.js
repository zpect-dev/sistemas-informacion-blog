/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Classes used in posts.js HTML string content (not scanned by Tailwind purge)
    { pattern: /^bg-(slate|violet)/ },
    { pattern: /^text-(slate|violet|white)/ },
    { pattern: /^border-(slate|violet)/ },
    { pattern: /^divide-(slate|violet)/ },
    { pattern: /^(p|px|py|my|mx|mt|mb|gap|space-y)-/ },
    { pattern: /^(rounded|overflow|w-full|flex|items|justify|font|tracking|uppercase|italic|table)/ },
    'text-xs', 'text-sm', 'text-lg',
    'font-mono', 'font-medium', 'font-semibold',
    'text-center', 'text-left',
    'overflow-x-auto', 'w-full',
    'divide-y',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        slate: {
          950: '#0a0f1e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
