/*
 * @Author: Carlos
 * @Date: 2023-01-12 23:31:33
 * @LastEditTime: 2023-05-22 18:31:52
 * @FilePath: /vite-react-swc/src/pages/blog/index.tsx
 * @Description:
 */
import { Outlet, useLocation } from 'react-router-dom'
import BlogLayout from './blog-layout'
import BlogHero from './blog-hero'
import useTitle from '@/hooks/useTitle'

type Props = {}
const BlogPage = (props: Props) => {
  const location = useLocation()
  useTitle('Carlos Blog')
  return (
    <BlogLayout>
      {location.pathname === '/blog' && (
        <BlogHero />
      )}
      <Outlet />
    </BlogLayout>
  )
}

export default BlogPage
