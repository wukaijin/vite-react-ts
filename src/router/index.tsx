/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2023-01-25 14:11:33
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description:
 */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import ManageRoute from './manage'
import Home from '@/pages/home'
import Todos from '@/pages/todos'
import Wait from '@/pages/Wait'
import Introduction from '@/pages/introduction'
import Test from '@/pages/test'
import { withSuspense } from './utils'
import NotFound from '@/pages/not-found'

const Hero = withSuspense(lazy(() => import('@/pages/hero')))
const Blog = withSuspense(lazy(() => import('@/pages/blog')))
const BlogArticle = withSuspense(lazy(() => import('@/pages/blog/article')))
const BlogCategory = withSuspense(lazy(() => import('@/pages/blog/category')))
const BlogTag = withSuspense(lazy(() => import('@/pages/blog/tag')))
const MusicPage = withSuspense(lazy(() => import('@/pages/music')))
const MusicHome = withSuspense(lazy(() => import('@/pages/music/music-home')))
const MusicSearch = withSuspense(lazy(() => import('@/pages/music/music-search')))
const PlaylistDetail = withSuspense(lazy(() => import('@/pages/music/playlist-detail')))

const config: RouteObject[] = [
  {
    path: '/',
    element: <Wait />
  },
  ManageRoute,
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
    path: '/blog',
    element: Blog,
    children: [
      {
        path: 'article/:id',
        element: BlogArticle
      },
      {
        path: 'category/:id',
        element: BlogCategory
      },
      {
        path: 'tag/:id',
        element: BlogTag
      }
    ]
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
  },
  {
    path: '*',
    element: <NotFound />
  },
]
export default createBrowserRouter(config)
