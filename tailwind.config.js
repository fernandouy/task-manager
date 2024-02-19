/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBackground: "#0D1117",
        columnBackgroundColor: "#161C22",
      },
    },
  },
  plugins: [],
};
