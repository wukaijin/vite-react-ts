/*
 * @Author: Carlos
 * @Date: 2023-01-22 23:36:34
 * @LastEditTime: 2023-05-22 13:42:59
 * @FilePath: /vite-react-ts/src/pages/blog/article/ArticleHeader.tsx
 * @Description:
 */
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { Article } from '@/interface/blog'
import { isMobile } from '@/const'

type Props = {
  data?: Article
}

const formatTime = (timeString: string) => dayjs(timeString).format('YYYY-MM-DD HH:mm')

function ArticleHeader({ data }: Props) {
  const navigate = useNavigate()

  if (!data) return null
  return (
    <div
      className={clsx({
        'px-4': isMobile
      })}
    >
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
      <div className="flex justify-between px-2 text-medium text-gray-500">
        <div>
          <span>Create At: </span>
          <span>{formatTime(data.createAt)}</span>
        </div>
        <div>
          <span>Update At: </span>
          <span>{formatTime(data.updateAt)}</span>
        </div>
      </div>
      <div className="text-center pb-8">
        {data.poster && (
          <img
            className={clsx({
              'w-48 inline-block': data.poster.endsWith('.svg'),
              'max-h-[40vh] inline-block': !data.poster.endsWith('.svg')
            })}
            src={data.poster}
            alt="poster"
          />
        )}
      </div>
    </div>
  )
}
export default ArticleHeader
