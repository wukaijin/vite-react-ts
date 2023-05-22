/*
 * @Author: Carlos
 * @Date: 2023-01-13 23:39:23
 * @LastEditTime: 2023-05-22 13:50:15
 * @FilePath: /vite-react-swc/src/pages/blog/article/index.tsx
 * @Description:
 */
import { useEffect, useRef, useState } from 'react'
import { HamburgerButton } from '@icon-park/react'
import { useClickAway, useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import { useSpring, animated } from '@react-spring/web'
import { ArticleApi } from '@/api/blog'
import MdReader from './MdReader'
import generateDirectory from '@/utils/generateDirectory'
import Directory from './Directory'
import ArticleHeader from './ArticleHeader'
import OtherCategory from '../OtherCategory'
import Related from './Related'
import styled from '../blog.module.scss'
import Loading from '@/components/base/Loading'
import NotFound from '@/pages/not-found'
import { isMobile } from '@/const'
import useTop from '@/hooks/useTop'

type Props = {}
function Article({}: Props) {
  const [visible, setVisibility] = useState(false)
  const [hasError, setHasError] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [headerStyle, headerApi] = useSpring(() => ({
    from: {
      opacity: 0,
      x: -300
    },
    config: {
      duration: 1000
    }
  }))
  const [contentStyle, contentApi] = useSpring(() => ({
    from: {
      opacity: 0,
      y: 300
    },
    config: {
      duration: 1000
    }
  }))
  useTop()
  const params = useParams()
  const {
    data,
    run: fetchArticle,
    loading
  } = useRequest(ArticleApi.findOne, {
    manual: true,
    onSuccess(d) {
      d && generateDirectory(d.content)
      headerApi.start({
        to: {
          opacity: 1,
          x: 0
        }
      })
      contentApi.start({
        to: {
          opacity: 1,
          y: 0
        }
      })
      setHasError(!d)
    }
  })
  useEffect(() => {
    if (params.id) {
      headerApi.start({
        to: {
          opacity: 0,
          x: -300
        }
      })
      contentApi.start({
        to: {
          opacity: 0,
          y: 300
        },
        onResolve() {
          params.id && fetchArticle(params.id)
        }
      })
    }
  }, [params])
  useClickAway(() => {
    visible && setVisibility(false)
  }, menuRef)
  // if (loading) {
  //   return (

  //   )
  // }
  if (!loading && hasError) {
    return (
      <div className="fixed top-0 left-0 bottom-0 right-0">
        <NotFound />
      </div>
    )
  }
  return (
    <div className={clsx('bg-fixed bg-cover', styled['paint-bg'])}>
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0">
          <Loading.Nest />
        </div>
      )}
      <div className={clsx('container m-auto flex relative ')}>
        <div className="flex-1 sm:max-w-[calc(100vw-300px)]">
          <div
            className={clsx({
              'px-4 py-8': !isMobile,
              'py-4': isMobile
            })}
          >
            <animated.div style={headerStyle}>
              <ArticleHeader data={data} />
            </animated.div>
            <animated.div className="border rounded-md pb-8 relative" style={contentStyle}>
              <div
                ref={menuRef}
                className="text-sm rounded-t-md h-12 px-4 flex text-center items-center justify-start border-b sticky top-[3.5rem] bg-white/40 backdrop-blur-md"
              >
                <span className="mr-2">
                  <HamburgerButton
                    className="align-text-bottom hover:scale-110 hover:opacity-70 cursor-pointer"
                    size="16"
                    onClick={() => setVisibility(_v => !_v)}
                  />
                </span>
                <span className="font-semibold">{data?.title}</span>
                <Directory
                  visible={visible}
                  setVisibility={setVisibility}
                  content={data?.content}
                />
              </div>
              <div className="px-4 py-4">
                <MdReader>{data?.content}</MdReader>
              </div>
            </animated.div>
          </div>
        </div>
        {!isMobile && (
          <div className="w-[300px]">
            <div className="fixed w-[300px] h-[calc(100vh-3.5rem)] top-[3.5rem] py-8">
              <OtherCategory title="Category" />
              <Related articleId={params.id || ''} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Article
