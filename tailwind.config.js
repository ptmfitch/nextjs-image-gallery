const {
  GALLERY_THUMB_WIDTH_PX,
  GALLERY_GRID_ROW_UNIT_PX,
} = require('./src/app/constants/galleryLayout.js');
const { SEARCH_LAYOUT } = require('./src/app/constants/searchLayout.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        'gallery-thumb': `${GALLERY_THUMB_WIDTH_PX}px`,
        'search-input': `${SEARCH_LAYOUT.inputWidthPx}px`,
        'search-input-sm': `${SEARCH_LAYOUT.inputWidthSmPx}px`,
      },
      gridTemplateColumns: {
        gallery: `repeat(auto-fit, minmax(${GALLERY_THUMB_WIDTH_PX}px, 1fr))`,
      },
      gridAutoRows: {
        gallery: `${GALLERY_GRID_ROW_UNIT_PX}px`,
      },
      colors: {
        'adobe-red': '#ED1C24',
      },
    },
  },
  plugins: [],
}
