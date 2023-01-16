/*
 * @Author: Carlos
 * @Date: 2023-01-14 15:59:27
 * @LastEditTime: 2023-01-15 21:21:49
 * @FilePath: /vite-react-swc/src/router/manage.tsx
 * @Description: 
 */
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { withSuspense } from './utils'

const Management = withSuspense(lazy(() => import('@/pages/management')))
const ManagementBlogCategories = withSuspense(lazy(() => import('@/pages/management/blog/categories')))
const ManagementBlogTags = withSuspense(lazy(() => import('@/pages/management/blog/tags')))
const ManagementBlogArticles = withSuspense(lazy(() => import('@/pages/management/blog/articles')))
const AddArticles = withSuspense(lazy(() => import('@/pages/management/blog/articles/Add')))
const route: RouteObject = {
  path: '/management',
  element: Management,
  children: [
    {
      path: 'blog/categories',
      element: ManagementBlogCategories
    },
    {
      path: 'blog/tags',
      element: ManagementBlogTags
    },
    {
      path: 'blog/articles',
      element: ManagementBlogArticles
    },
    {
      path: 'blog/articles/add',
      element: AddArticles
    },
    
  ]
}
export default route
