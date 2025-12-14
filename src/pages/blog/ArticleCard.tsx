/*
 * @Author: Carlos
 * @Date: 2023-01-14 14:39:16
 * @LastEditTime: 2023-08-22 23:49:18
 * @FilePath: /vite-react-ts/src/pages/blog/ArticleCard.tsx
 * @Description:
 */

import { useNavigate } from 'react-router-dom'
import { type Article } from '@/interface/blog'

type Props = {
  data: Article
}
const ArticleCard = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()
  const toCategory = () => navigate(`/blog/category/${data.category.id}`)
  const toArticle = () => navigate(`/blog/article/${data.id}`)
  return (
    <div className="flex rounded-xl shadow-xl bg-gray-100/30 backdrop-blur-sm">
      <div
        className="w-32 rounded-l-xl bg-cover bg-no-repeat bg-center cursor-pointer"
        style={{
          backgroundImage: `url(${data.poster || data.category?.defaultPoster})`
        }}
        onClick={toCategory}
      />
      <div className="flex-1 px-4 py-3 overflow-hidden">
        <h2
          className="card-title mb-1 text-base hover:opacity-80 cursor-pointer text-ellipsis overflow-hidden line-clamp-1"
          onClick={toArticle}
        >
          {data.title}
        </h2>
        <div className="h-12 mb-2 line-clamp-2 text-gray-800/70 cursor-pointer" onClick={toArticle}>
          {data.description}
        </div>
        <div className="">
          <p className="inline-block hover:opacity-80 cursor-pointer mr-4" onClick={toCategory}>
            {data.category.text}
          </p>
          {data.tags.map(tag => (
            <div
              key={tag.id}
              className="badge cursor-pointer hover:scale-110 mr-2 border-none"
              style={{
                backgroundColor: tag.color,
                color: 'white'
              }}
            >
              {tag.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ArticleCard
