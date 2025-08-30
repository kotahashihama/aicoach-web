import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  color: {
    background: {
      primary: '#1e1e1e',
      secondary: '#252526',
      tertiary: '#2d2d30',
      quaternary: '#3c3c3c',
    },
    text: {
      primary: '#d4d4d4',
      secondary: '#cccccc',
      tertiary: '#6e6e6e',
    },
    border: {
      primary: '#3e3e42',
      secondary: '#464647',
    },
    brand: {
      primary: '#0e639c',
      primaryHover: '#1177bb',
    },
    error: {
      background: '#5a1d1d',
      text: '#f48771',
      border: '#763c3c',
    },
    warning: {
      text: '#f48771',
    },
  },
  font: {
    system:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"Consolas", "Courier New", monospace',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
  },
  fontSize: {
    xs: '13px',
    sm: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
  },
  lineHeight: {
    normal: '1.5',
    relaxed: '1.6',
  },
  transition: {
    fast: '0.2s',
  },
})
