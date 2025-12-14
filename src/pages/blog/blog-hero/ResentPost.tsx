/*
 * @Author: Carlos
 * @Date: 2023-01-20 15:25:07
 * @LastEditTime: 2023-01-31 17:51:51
 * @FilePath: /vite-react-ts/src/pages/blog/blog-hero/ResentPost.tsx
 * @Description:
 */
import { useRequest } from 'ahooks'
import clsx from 'clsx'
import { ArticleApi } from '@/api/blog'
import ArticleCard from '../ArticleCard'
import { isMobile } from '@/const'
function ResentPost() {
  const { data = [] } = useRequest(ArticleApi.findAll)
  return (
    <>
      <header
        className={clsx('text-center', {
          'py-16': !isMobile,
          'py-12': isMobile
        })}
      >
        <span className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold">
          Recent posts
        </span>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 px-4 pb-8">
        {data.map(article => (
          <ArticleCard key={article.id} data={article} />
        ))}
      </div>
    </>
  )
}
export default ResentPost
