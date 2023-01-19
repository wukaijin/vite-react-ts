/*
 * @Author: Carlos
 * @Date: 2023-01-14 14:39:16
 * @LastEditTime: 2023-01-18 22:41:34
 * @FilePath: /vite-react-swc/src/pages/blog/ArticleCard.tsx
 * @Description:
 */

import { useNavigate } from 'react-router-dom'

type Props = {}
const ArticleCard = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex rounded-xl shadow-xl bg-gray-100/30 backdrop-blur-sm">
      <figure>
        <img
          className="w-32 aspect-square rounded-l-xl"
          src="https://placeimg.com/200/200/arch"
          alt=""
        />
      </figure>
      <div className="flex-1 p-4 overflow-hidden">
        <h2
          className="card-title text-base hover:opacity-80 cursor-pointer text-ellipsis overflow-hidden line-clamp-1"
          onClick={() => navigate('/blog/article')}
        >
          [千库] 海量编程素材免费下载-,高质精品素材网站
        </h2>
        <p className="my-2 hover:opacity-80 cursor-pointer">JavaScript</p>
        <div>
          <p className="badge badge-primary mr-2 cursor-pointer hover:scale-110">design pattern</p>
          <div className="badge badge-secondary cursor-pointer  hover:scale-110">TypeScript</div>
        </div>
      </div>
    </div>
  )
}
export default ArticleCard
