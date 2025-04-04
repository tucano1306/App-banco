/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#0066cc',
            light: '#3399ff',
            dark: '#004c99',
          },
          secondary: {
            DEFAULT: '#f8f9fa',
            dark: '#e9ecef',
          },
        },
      },
    },
    plugins: [],
  }