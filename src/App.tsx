/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2025-12-13 22:13:00
 * @FilePath: /vite-react-swc/src/App.tsx
 * @Description:
 */
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return <RouterProvider router={router} />
}

export default App
