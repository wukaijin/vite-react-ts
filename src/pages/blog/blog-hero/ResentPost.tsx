/*
 * @Author: Carlos
 * @Date: 2023-01-20 15:25:07
 * @LastEditTime: 2023-01-24 14:59:37
 * @FilePath: /vite-react-swc/src/pages/blog/blog-hero/ResentPost.tsx
 * @Description:
 */
import { useRequest } from 'ahooks'
import { ArticleApi } from '@/api/blog'
import ArticleCard from '../ArticleCard'

type Props = {}
function ResentPost({}: Props) {
  const { data = [] } = useRequest(ArticleApi.findAll)
  return (
    <>
      <header className="py-16 text-center ">
        <span className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold">
          Recent posts
        </span>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 px-4 pb-8">
        {data.map((article) => (
          <ArticleCard key={article.id} data={article} />
        ))}
      </div>
    </>
  )
}
export default ResentPost
