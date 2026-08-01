export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        paper: '#F5F6F3',
        'paper-raised': '#FFFFFF',
        ink: '#14181A',
        'ink-soft': '#55605C',
        line: '#DBDFDA',
        brand: '#146C43',
        'brand-deep': '#0E4E31',
        marker: '#C1512F',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        accent: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
}
