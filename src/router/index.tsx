/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2023-01-09 21:16:18
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description:
 */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'
import Todos from '@/pages/todos'
import Wait from '@/pages/Wait'
import Introduction from '@/pages/introduction'
import Test from '@/pages/test'
import MusicPage from '@/pages/music'
import MusicHome from '@/pages/music/music-home'
import MusicSearch from '@/pages/music/music-search'

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
    element: <MusicPage />,
    children: [
      {
        path: 'home',
        element: <MusicHome />
      },
      {
        path: 'search',
        element: <MusicSearch />
      },
    ]
  },
  {
    path: '/test',
    element: <Test />
  }
]
export default createBrowserRouter(config)
