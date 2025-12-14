/*
 * @Author: Carlos
 * @Date: 2023-01-19 14:26:08
 * @LastEditTime: 2023-01-31 21:11:36
 * @FilePath: /vite-react-ts/src/pages/blog/tag/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import clsx from 'clsx'
import { TagApi } from '@/api/blog'
import sharedStyled from '../blog.module.scss'

const BlogTag = () => {
  const [, setHasError] = useState<boolean>(false)
  const params = useParams<string>()
  const { runAsync: fetchTags } = useRequest(TagApi.findAll, {
    manual: true,
    onSuccess(d) {
      if (!d) {
        setHasError(true)
      }
    },
    onError() {}
  })

  useEffect(() => {
    fetchTags()
  }, [params])
  return (
    <div
      className={clsx(
        sharedStyled['paint-bg'],
        ' bg-fixed bg-no-repeat bo-cover min-h-[calc(100vh-49px)]'
      )}
    >
      <div className={clsx('h-full min-h-[calc(100vh-49px)] bg-white/70')}>
        <div className="container m-auto bg-red flex relative">
          <div className="flex-1"></div>
          <div className="w-[300px]">213</div>
        </div>
      </div>
    </div>
  )
}
export default BlogTag
