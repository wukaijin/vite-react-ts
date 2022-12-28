/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2022-12-28 15:31:02
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description: 
 */
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'
import Todos from '@/pages/todos'

const config: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/todos',
    element: <Todos />
  }
]
export default createBrowserRouter(config)