/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep blue (primary) - blue-800
        'primary-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-200': '#BFDBFE', // Light blue (200-level shade) - blue-200
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-600': '#2563EB', // Medium-dark blue (600-level shade) - blue-600
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Very dark blue (900-level shade) - blue-900

        // Secondary Colors
        'secondary': '#7C3AED', // Vibrant purple (secondary) - violet-600
        'secondary-50': '#F5F3FF', // Very light purple (50-level shade) - violet-50
        'secondary-100': '#EDE9FE', // Light purple (100-level shade) - violet-100
        'secondary-200': '#DDD6FE', // Light purple (200-level shade) - violet-200
        'secondary-500': '#8B5CF6', // Medium purple (500-level shade) - violet-500
        'secondary-700': '#6D28D9', // Dark purple (700-level shade) - violet-700
        'secondary-900': '#4C1D95', // Very dark purple (900-level shade) - violet-900

        // Accent Colors
        'accent': '#F59E0B', // Warm amber (accent) - amber-500
        'accent-50': '#FFFBEB', // Very light amber (50-level shade) - amber-50
        'accent-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'accent-200': '#FDE68A', // Light amber (200-level shade) - amber-200
        'accent-400': '#FBBF24', // Medium-light amber (400-level shade) - amber-400
        'accent-600': '#D97706', // Medium-dark amber (600-level shade) - amber-600
        'accent-700': '#B45309', // Dark amber (700-level shade) - amber-700
        'accent-900': '#78350F', // Very dark amber (900-level shade) - amber-900

        // Background Colors
        'background': '#FAFBFC', // Soft off-white (background) - slate-50
        'surface': '#FFFFFF', // Pure white (surface) - white

        // Text Colors
        'text-primary': '#111827', // Near-black (text primary) - gray-900
        'text-secondary': '#6B7280', // Medium gray (text secondary) - gray-500
        'text-muted': '#9CA3AF', // Light gray (text muted) - gray-400

        // Status Colors
        'success': '#10B981', // Fresh green (success) - emerald-500
        'success-50': '#ECFDF5', // Very light green (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light green (100-level shade) - emerald-100
        'success-600': '#059669', // Medium-dark green (600-level shade) - emerald-600
        'success-700': '#047857', // Dark green (700-level shade) - emerald-700

        'warning': '#F59E0B', // Consistent amber (warning) - amber-500
        'warning-50': '#FFFBEB', // Very light amber (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'warning-600': '#D97706', // Medium-dark amber (600-level shade) - amber-600

        'error': '#EF4444', // Clear red (error) - red-500
        'error-50': '#FEF2F2', // Very light red (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light red (100-level shade) - red-100
        'error-600': '#DC2626', // Medium-dark red (600-level shade) - red-600
        'error-700': '#B91C1C', // Dark red (700-level shade) - red-700

        // Border Colors
        'border': '#E5E7EB', // Minimal border (border) - gray-200
        'border-light': '#F3F4F6', // Light border (border-light) - gray-100
        'border-dark': '#D1D5DB', // Dark border (border-dark) - gray-300
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
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-4': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-5': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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