/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "peanut-butter": "url('/src/assets/3586184.jpg')",
      },
    },
    plugins: [],
  },
};
