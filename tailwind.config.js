/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", // covers all source files
  ],
  theme: {
    extend: {
      fontFamily: {
        replica: ['"ReplicaProRegular"', 'sans-serif'],
        replicabold: ['"ReplicaProBold"', 'sans-serif'],
        replicalight: ['"ReplicaProLight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
