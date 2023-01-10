/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2023-01-10 23:07:35
 * @FilePath: /vite-react-swc/src/main.tsx
 * @Description:
 */
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './main.scss'
import 'overlayscrollbars/overlayscrollbars.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)
