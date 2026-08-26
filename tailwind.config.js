/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'm-orange': '#E4492E',
        'm-orange-glow': 'rgba(228, 73, 46, 0.4)',
        'carbon-black': '#0D0D0D',
        'cyclorama-gray': '#EBEBEB',
        'panel-white': '#F5F5F7',
        'border-subtle': '#D4D4D8',
        'surface-dim': '#131313',
        'surface-container-low': '#1b1b1b',
        'surface-container': '#1f1f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353535',
        'surface-container-lowest': '#0e0e0e',
        'surface-bright': '#393939',
        'on-surface': '#e2e2e2',
        'on-surface-variant': '#c4c7c8',
        'secondary-container': '#c00207',
        'error-container': '#93000a',
        'tertiary-fixed': '#e5e2e1',
        'outline-variant': '#444748',
        'text-muted': '#8E9192',
      },
      fontFamily: {
        'display': ['"Anton"', '"PP Neue Montreal"', '"Neue Haas Grotesk Display Pro"', '-apple-system', 'sans-serif'],
        'mono': ['"Courier Prime"', '"Geist Mono"', '"Space Mono"', 'monospace'],
        'italic-spec': ['"Courier Prime"', '"Editorial New Italic"', '"Druk Wide Italic"', 'serif', 'monospace'],
      },
      spacing: {
        'margin-edge': '48px',
        'gutter': '24px',
        'stack-lg': '64px',
        'stack-md': '16px',
        'stack-sm': '8px',
        'unit': '4px',
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'tight-hero': '-0.05em',
      }
    },
  },
  plugins: [],
}
