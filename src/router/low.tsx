/*
 * @Author: Carlos
 * @Date: 2023-04-26 16:15:00
 * @LastEditTime: 2023-04-26 16:20:15
 * @FilePath: /vite-react-swc/src/router/low.tsx
 * @Description: null
 */
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { withSuspense } from './utils'

const LowCodeLayout = withSuspense(lazy(() => import('@/pages/low-code')))
const LowCodeEditor = withSuspense(lazy(() => import('@/pages/low-code/editor')))
const route: RouteObject = {
  path: '/low-code',
  element: LowCodeLayout,
  children: [
    {
      path: 'editor',
      element: LowCodeEditor
    },
  ]
}
export default route
