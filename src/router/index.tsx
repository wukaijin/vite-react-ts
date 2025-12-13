/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:53:19
 * @LastEditTime: 2023-04-26 16:22:14
 * @FilePath: /vite-react-swc/src/router/index.tsx
 * @Description:
 */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import ManageRoute from './manage'
import Home from '@/pages/home'
import { withSuspense } from './utils'
import NotFound from '@/pages/not-found'

const Introduction = withSuspense(lazy(() => import('@/pages/introduction')))
// const Wait = withSuspense(lazy(() => import('@/pages/Wait')))

const Hero = withSuspense(lazy(() => import('@/pages/hero')))
const Blog = withSuspense(lazy(() => import('@/pages/blog')))
const BlogArticle = withSuspense(lazy(() => import('@/pages/blog/article')))
const BlogCategory = withSuspense(lazy(() => import('@/pages/blog/category')))
const BlogTag = withSuspense(lazy(() => import('@/pages/blog/tag')))

const config: RouteObject[] = [
  {
    path: '/',
    element: Hero
    // element: Wait
  },
  ManageRoute,
  {
    path: '/introduction',
    element: Introduction
  },
  {
    path: '/home',
    element: <Home />
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
    path: '*',
    element: <NotFound />
  }
]

const Router = createBrowserRouter(config)
export default Router
