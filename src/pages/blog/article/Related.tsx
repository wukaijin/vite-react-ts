/*
 * @Author: Carlos
 * @Date: 2023-01-24 14:14:58
 * @LastEditTime: 2023-01-24 15:29:19
 * @FilePath: /vite-react-swc/src/pages/blog/article/Related.tsx
 * @Description:
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { useRequest } from 'ahooks'
import { ArticleApi } from '@/api/blog'

type Props = {
  articleId: string
}

function Related({ articleId }: Props) {
  const navigate = useNavigate()
  const [style, listApi] = useSpring(() => ({
    from: {
      opacity: 0,
      x: 300
    }
    // delay: 300
  }))
  const { data, run } = useRequest(ArticleApi.findRelativeById, {
    manual: true,
    onSuccess() {
      listApi.start({
        to: {
          opacity: 1,
          x: 0
        }
      })
    }
  })

  useEffect(() => {
    if (articleId) {
      listApi.start({
        to: {
          opacity: 0,
          x: 300
        },
        onResolve() {
          run(articleId)
        }
      })
    }
  }, [articleId])
  return (
    <animated.div style={style}>
      <h2 className="pb-2">Related:</h2>
      <ul className="px-2">
        {data &&
          !!data.length &&
          data.map(article => (
            <li key={article.id}>
              <span
                className="text-slate-800 hover:text-sky-500 cursor-pointer"
                onClick={() => navigate(`/blog/article/${article.id}`)}
              >
                {article.title}
              </span>
            </li>
          ))}
      </ul>
    </animated.div>
  )
}
export default Related
