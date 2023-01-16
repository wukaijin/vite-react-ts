/*
 * @Author: Carlos
 * @Date: 2023-01-12 23:31:33
 * @LastEditTime: 2023-01-16 13:54:27
 * @FilePath: /vite-react-swc/src/pages/blog/index.tsx
 * @Description:
 */
import clsx from 'clsx'
import { Outlet, useLocation } from 'react-router-dom'
import BlogLayout from './blog-layout'
import styled from './blog.module.scss'
import ArticleCard from './ArticleCard'

type Props = {}
const BlogPage = (props: Props) => {
  const location = useLocation()
  return (
    <BlogLayout>
      {location.pathname === '/blog' && (
        <div className={clsx(styled['bg-index'], 'min-h-[calc(100vh-3.5rem)] text-white/90')}>
          <div className={clsx('container sm:min-w-[600px] lg:max-w-[1200px] m-auto')}>
            <header className="py-16 sm:text-center ">
              <span className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold">
                Recent posts
              </span>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </BlogLayout>
  )
}

export default BlogPage
