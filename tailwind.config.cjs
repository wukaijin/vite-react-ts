/*
 * @Author: Carlos
 * @Date: 2022-12-28 16:22:14
 * @LastEditTime: 2022-12-30 23:17:49
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
    extend: {
      lineHeight: {
        '12': '3rem',
        '14': '3.5rem',
      }
    },
  },
  plugins: [require("daisyui")],
}
