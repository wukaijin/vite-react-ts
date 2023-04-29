/*
 * @Author: Carlos
 * @Date: 2023-01-14 14:39:16
 * @LastEditTime: 2023-04-27 17:12:24
 * @FilePath: /vite-react-swc/src/pages/blog/ArticleCard.tsx
 * @Description:
 */

import { useNavigate } from 'react-router-dom'
import { Article } from '@/interface/blog'

type Props = {
  data: Article
}
const ArticleCard = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()
  const toArticle = () => navigate(`/blog/category/${data.category.id}`)
  return (
    <div className="flex rounded-xl shadow-xl bg-gray-100/30 backdrop-blur-sm">
      {/* <figure>
        <img
          className="w-32 aspect-square rounded-l-xl"
          src={data.poster || 'https://placeimg.com/200/200/arch'}
          alt=""
        />
      </figure> */}
      <div
        className="w-32 rounded-l-xl bg-cover"
        style={{
          backgroundImage: `url(${data.poster || data.category?.defaultPoster})`
        }}
        onClick={toArticle}
      />
      <div className="flex-1 px-4 py-3 overflow-hidden">
        <h2
          className="card-title mb-1 text-base hover:opacity-80 cursor-pointer text-ellipsis overflow-hidden line-clamp-1"
          onClick={() => navigate(`/blog/article/${data.id}`)}
        >
          {data.title}
        </h2>
        <div className="h-12 mb-2 line-clamp-2 text-gray-800/70">{data.description}</div>
        <div className="">
          <p
            className="inline-block hover:opacity-80 cursor-pointer mr-4"
            onClick={toArticle}
          >
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
