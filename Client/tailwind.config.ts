/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          customPurple:"#C8ACD6",  // Define your custom color
          customPurple2:"#433D8B",  // Define your custom color
        },
      },
    },
    plugins: [],
  }