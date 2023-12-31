/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        deep: "5px 5px 11px -3px rgba(3, 11, 17, 0.7), -3px -3px 0px -2px rgba(111, 156, 191, 0.7)",
        light: "3px 3px 8px -3px rgba(3, 11, 17, 0.7), -3px -2px 5px -3px rgba(111, 156, 191, 0.7)",
      },
      screens: {
        ssm: "510px"
      }
    },
  },
  plugins: [],
}

