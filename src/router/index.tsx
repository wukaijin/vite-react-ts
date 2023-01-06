/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2023-01-06 13:42:19
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description:
 */
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'
import Todos from '@/pages/todos'
import Wait from '@/pages/Wait'
import Introduction from '@/pages/introduction'
import Test from '@/pages/test'
import MusicPage from '@/pages/music'

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
  },
  {
    path: '/music',
    element: <MusicPage />
  },
  {
    path: '/test',
    element: <Test />
  }
]
export default createBrowserRouter(config)
