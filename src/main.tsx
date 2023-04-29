/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2023-04-27 09:16:02
 * @FilePath: /vite-react-swc/src/main.tsx
 * @Description:
 */
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './main.scss'
import 'overlayscrollbars/overlayscrollbars.css'
// theme
import 'primereact/resources/themes/lara-light-indigo/theme.css'
// core
import 'primereact/resources/primereact.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)
