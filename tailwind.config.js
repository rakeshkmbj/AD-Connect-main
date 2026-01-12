/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'xyz': ["Exo 2", "sans-serif"], // Custom font family
      },
      colors: {
        sideBarColor: '#63040D', // Custom color for sidebar
        sideMenuColor: '#97D9EA', // Custom color for side menu
        subMenuColor: '#E8EDEE', // Custom color for submenu
        silverColor: '#E9ECF3', // Custom silver color
      },
      height: {
        '80vh': '80vh', // Custom height for image container
      },
      width: {
        '60%': '60%', // Custom width for image container
      },
    },

  },
  plugins: [
    require('flowbite/plugin')
  ],
}

