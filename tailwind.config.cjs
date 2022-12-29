/*
 * @Author: Carlos
 * @Date: 2022-12-28 16:22:14
 * @LastEditTime: 2022-12-29 22:39:43
 * @FilePath: /vite-react-swc/tailwind.config.cjs
 * @Description: 
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  // plugins: [require('@tailwindcss/forms')],
  plugins: [],
}
