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
import './main.scss'
import 'overlayscrollbars/overlayscrollbars.css'

// PrimeReact 主题与核心样式
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
