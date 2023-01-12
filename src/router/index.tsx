/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2023-01-12 16:47:13
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description:
 */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/home'
import Todos from '@/pages/todos'
import Wait from '@/pages/Wait'
import Introduction from '@/pages/introduction'
import Test from '@/pages/test'

const Hero = withSuspense(lazy(() => import('@/pages/hero')))
const MusicPage = withSuspense(lazy(() => import('@/pages/music')))
const MusicHome = withSuspense(lazy(() => import('@/pages/music/music-home')))
const MusicSearch = withSuspense(lazy(() => import('@/pages/music/music-search')))
const PlaylistDetail = withSuspense(lazy(() => import('@/pages/music/playlist-detail')))

function withSuspense(Comp: ReturnType<typeof lazy>, fallback?: JSX.Element) {
  return (
    <Suspense fallback={fallback || null}>
      <Comp />
    </Suspense>
  )
}

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
    path: '/hero',
    element: Hero
  },
  {
    path: '/music',
    element: MusicPage,
    children: [
      {
        path: 'home',
        element: MusicHome
      },
      {
        path: 'search',
        element: MusicSearch
      },
      {
        path: 'playlist-detail',
        element: PlaylistDetail
      }
    ]
  },
  {
    path: '/test',
    element: <Test />
  }
]
export default createBrowserRouter(config)
