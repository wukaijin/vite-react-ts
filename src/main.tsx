/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2025-12-14
 * @FilePath: /vite-react-ts/src/main.tsx
 * @Description: 应用入口文件
 */
import ReactDOM from 'react-dom/client'
import App from './App'

// 全局样式
import './addon.css'
import './main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
