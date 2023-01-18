/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:11:09
 * @LastEditTime: 2023-01-16 14:15:10
 * @FilePath: /vite-react-swc/src/pages/blog/blog-hero/index.tsx
 * @Description: 
 */
import clsx from 'clsx'
import ArticleCard from '../ArticleCard'
import styled from '../blog.module.scss'

type Props = {}
function BlogHero({}: Props) {
  return (
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
  )
}
export default BlogHero
