/*
 * @Author: Carlos
 * @Date: 2023-01-12 23:31:33
 * @LastEditTime: 2023-01-16 14:12:36
 * @FilePath: /vite-react-swc/src/pages/blog/index.tsx
 * @Description:
 */
import clsx from 'clsx'
import { Outlet, useLocation } from 'react-router-dom'
import BlogLayout from './blog-layout'
import styled from './blog.module.scss'
import ArticleCard from './ArticleCard'
import BlogHero from './blog-hero'

type Props = {}
const BlogPage = (props: Props) => {
  const location = useLocation()
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
