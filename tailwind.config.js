/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here
        'concourse-dark': '#3d3c3c',
        'concourse-light': '#484848',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class', // or 'media' if you want to respect system preferences
}