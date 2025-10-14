/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 2px 6px rgba(0,0,0,0.1)',
        deep: '0 4px 12px rgba(0,0,0,0.15)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#2563eb',
          secondary: '#7c3aed',
          accent: '#22c55e',
          neutral: '#1e293b',
          'base-100': '#ffffff',
          'base-200': '#f8fafc',
          'base-300': '#e2e8f0',
          'base-content': '#1e293b',
        },
      },
      {
        dark: {
          primary: '#60a5fa',
          secondary: '#c084fc',
          accent: '#4ade80',
          neutral: '#0f172a',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          'base-content': '#f1f5f9',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
