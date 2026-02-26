/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Zoviz Deep Teal/Emerald
        'primary': '#006D77', // Teal-600 approx
        'primary-50': '#F0FDFA',
        'primary-100': '#CCFBF1',
        'primary-200': '#99F6E4',
        'primary-500': '#14B8A6',
        'primary-600': '#0D9488',
        'primary-700': '#0F766E',
        'primary-900': '#134E4A',

        // Secondary - Cool Cyan/Blue
        'secondary': '#0EA5E9',
        'secondary-50': '#F0F9FF',
        'secondary-100': '#E0F2FE',
        'secondary-200': '#BAE6FD',
        'secondary-500': '#0EA5E9',
        'secondary-700': '#0369A1',
        'secondary-900': '#0C4A6E',

        // Accent - Warm Amber (for subtle highlights if needed)
        'accent': '#F59E0B',
        'accent-50': '#FFFBEB',
        'accent-100': '#FEF3C7',
        'accent-200': '#FDE68A',
        'accent-400': '#FBBF24',
        'accent-600': '#D97706',
        'accent-700': '#B45309',
        'accent-900': '#78350F',

        // Neutrals & Backgrounds - Zoviz Clean Light Theme
        'background': '#F9FAFB', // Off-white
        'surface': '#FFFFFF',    // Pure White
        'surface-hover': '#F3F4F6',

        // Text - Zoviz high contrast
        'text-primary': '#111827',   // Navy/Black for headings
        'text-secondary': '#4B5563', // Slate Gray for body
        'text-muted': '#9CA3AF',     // Light Gray
        'text-inverted': '#FFFFFF',

        // Status
        'success': '#10B981',
        'success-50': '#ECFDF5',
        'success-100': '#D1FAE5',
        'success-600': '#059669',
        'success-700': '#047857',

        'warning': '#F59E0B',
        'warning-50': '#FFFBEB',
        'warning-100': '#FEF3C7',
        'warning-600': '#D97706',

        'error': '#EF4444',
        'error-50': '#FEF2F2',
        'error-100': '#FEE2E2',
        'error-600': '#DC2626',
        'error-700': '#B91C1C',

        // Borders
        'border': '#E5E7EB', // Gray 200
        'border-light': '#F3F4F6',
        'border-dark': '#D1D5DB',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px -1px rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'elevation-2': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'elevation-3': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
        'elevation-4': '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03)',
        'glow-primary': '0 0 15px rgba(79, 70, 229, 0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-out': 'ease-out',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      animation: {
        'pulse-branded': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      zIndex: {
        '1000': '1000',
        '1001': '1001',
        '1100': '1100',
        '1200': '1200',
        '2000': '2000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}