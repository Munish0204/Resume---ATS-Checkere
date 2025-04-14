/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  future: {
    disableColorPaletteOpacity: true, // Ensures colors use RGB/HEX instead of OKLCH
  },
  experimental: {
    optimizeUniversalDefaults: true, // Prevents oklch() colors from being used
  },
  plugins: [],
};
