/*
 * @Author: Carlos
 * @Date: 2022-12-28 16:22:14
 * @LastEditTime: 2023-01-15 21:41:22
 * @FilePath: /vite-react-swc/tailwind.config.cjs
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['node_modules/daisyui/dist/**/*.js', './src/**/*.{html,jsx,tsx}', './index.html'],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: [
      {
        myTheme: {
          // primary: '#608ffc',
          // 'primary-focus': '#5084fc',
          primary: '#A370F0',
          'primary-focus': '#9370F0',
          'primary-content': '#ffffff',
          secondary: '#608ffc',
          'secondary-focus': '#5084fc',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          neutral: '#ffffff',
          'neutral-focus': '#ede9fe',
          'neutral-content': '#475569',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#6DA3EE',
          success: '#2EE0C5',
          warning: '#FBB35B',
          error: '#ff5858' // #E55548
        }
      }
    ]
  },
  theme: {
    extend: {
      lineHeight: {
        '12': '3rem',
        '14': '3.5rem'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
