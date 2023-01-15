/*
 * @Author: Carlos
 * @Date: 2023-01-14 15:59:27
 * @LastEditTime: 2023-01-14 16:10:30
 * @FilePath: /vite-react-swc/src/router/manage.tsx
 * @Description: 
 */
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { withSuspense } from './utils'

const Management = withSuspense(lazy(() => import('@/pages/management')))
const ManagementBlogModules = withSuspense(lazy(() => import('@/pages/management/blog/modules')))
const ManagementBlogTags = withSuspense(lazy(() => import('@/pages/management/blog/tags')))
const ManagementBlogArticles = withSuspense(lazy(() => import('@/pages/management/blog/articles')))
const route: RouteObject = {
  path: '/management',
  element: Management,
  children: [
    {
      path: 'blog/modules',
      element: ManagementBlogModules
    },
    {
      path: 'blog/tags',
      element: ManagementBlogTags
    },
    {
      path: 'blog/articles',
      element: ManagementBlogArticles
    }
  ]
}
export default route
