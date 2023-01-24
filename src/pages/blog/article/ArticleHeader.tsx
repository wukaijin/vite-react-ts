/*
 * @Author: Carlos
 * @Date: 2023-01-22 23:36:34
 * @LastEditTime: 2023-01-24 15:06:48
 * @FilePath: /vite-react-swc/src/pages/blog/article/ArticleHeader.tsx
 * @Description:
 */
import { useNavigate } from 'react-router-dom'
import { Article } from '@/interface/blog'

type Props = {
  data?: Article
}
function ArticleHeader({ data }: Props) {
  const navigate = useNavigate()
  if (!data) return null
  return (
    <div>
      <div className="flex items-center justify-start pb-4">
        {data.category.belongs && (
          <span className="text-xl opacity-70 mr-2">{data.category.belongs?.text}</span>
        )}
        <img
          className="rounded-full w-8 h-8 inline-block mr-2"
          src={data.category?.defaultPoster}
          alt=""
        />
        <span
          className="text-xl hover:opacity-60"
          onClick={() => navigate(`/blog/category/${data.category.id}`)}
        >
          {data.category?.text}
        </span>
      </div>
      <div>
        {data.tags &&
          data.tags.length &&
          data.tags.map(tag => (
            <span
              key={tag.id}
              className="badge cursor-pointer hover:scale-110 mr-2 border-none"
              style={{
                backgroundColor: tag.color,
                color: 'white'
              }}
            >
              {tag.text}
            </span>
          ))}
      </div>
      <h1 className="text-4xl leading-loose py-4">{data.title}</h1>
      <div>
        <img src={data.poster} alt="" />
      </div>
    </div>
  )
}
export default ArticleHeader
