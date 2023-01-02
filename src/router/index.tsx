/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2023-01-01 15:06:07
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description:
 */
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'
import Todos from '@/pages/todos'
import Wait from '@/pages/Wait'
import Introduction from '@/pages/introduction'

const config: RouteObject[] = [
  {
    path: '/',
    element: <Wait />
  },
  {
    path: '/introduction',
    element: <Introduction />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/todos',
    element: <Todos />
  }
]
export default createBrowserRouter(config)
