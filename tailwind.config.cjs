/*
 * @Author: Carlos
 * @Date: 2022-12-28 16:22:14
 * @LastEditTime: 2022-12-31 17:03:11
 * @FilePath: /vite-react-swc/tailwind.config.cjs
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    // enabled: false,
    content: [ "./src/**/*.{html,jsx,tsx}",
    "./index.html"]
  },
  content: [ "./src/**/*.{html,jsx,tsx}",
  "./index.html"],
  // daisyui: {
  //   styled: true,
  //   themes: true,
  //   base: true,
  //   utils: true,
  //   logs: true,
  //   rtl: false,
  //   prefix: '',
  //   darkTheme: 'light'
  // },
  theme: {
    extend: {
      lineHeight: {
        '12': '3rem',
        '14': '3.5rem'
      }
    }
  },
  plugins: [require('daisyui')]
}
