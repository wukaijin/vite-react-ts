/*
 * @Author: Carlos
 * @Date: 2023-01-19 14:26:08
 * @LastEditTime: 2023-01-25 22:05:52
 * @FilePath: /vite-react-swc/src/pages/blog/category/index.tsx
 * @Description:
 */
import { CSSProperties, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import ReactSelect from 'react-select'
import clsx from 'clsx'
import { useSpring, animated } from '@react-spring/web'
import { ArticleApi, CategoryApi } from '@/api/blog'
import sharedStyled from '../blog.module.scss'
import ArticleCard from '../ArticleCard'
import { Article, Tag } from '@/interface/blog'
import OtherCategory from '../OtherCategory'
import Loading from '@/components/base/Loading'
import NoData from '@/components/shared/NoData'

type Props = {}
const BlogCategory = (props: Props) => {
  const [hasError, setHasError] = useState<boolean>(false)
  const [tags, setTags] = useState<Tag[]>()
  const params = useParams<string>()
  const [mainStyle, mainApi] = useSpring(() => ({
    from: {
      opacity: 0,
      x: -300
    }
  }))
  const [listStyle, listApi] = useSpring(() => ({
    from: {
      opacity: 0,
      y: 300
    }
  }))
  const [siderStyle, siderApi] = useSpring(() => ({
    from: {
      opacity: 0,
      x: 300
    }
  }))
  const [style, setStyle] = useState<CSSProperties>({})
  const {
    data: categoryDTO,
    loading: loadingTag,
    runAsync: fetchCategory
  } = useRequest(CategoryApi.findOne, {
    manual: true,
    onSuccess(d) {
      if (!d) {
        setHasError(true)
        return
      }
      setStyle({ backgroundImage: `url(${d.defaultPoster || 'http://placeimg.com/640/480/tech'})` })
      mainApi.start({
        to: {
          opacity: 1,
          x: 0
        }
      })
      siderApi.start({
        to: {
          opacity: 1,
          x: 0
        }
      })
    },
    onError() {
      setHasError(true)
    }
  })
  const {
    data: articles = [],
    loading: loadingArticles,
    runAsync: fetchArticles
  } = useRequest(ArticleApi.findByCategoryId, {
    manual: true,
    onSuccess(d) {
      if (!d) {
        setHasError(true)
      }
      listApi.start({
        to: {
          opacity: 1,
          y: 0
        }
      })
      setTags([])
    },
    onError() {
      setHasError(true)
    }
  })

  const tagOptions = useMemo(() => {
    if (!articles || !articles.length) return []
    return (articles as Article[]).reduce((acc: Tag[], article: Article) => {
      article.tags &&
        article.tags.forEach(_tag => {
          if (!acc.find(t => t.id === _tag.id)) acc.push(_tag)
        })
      return acc
    }, [])
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (!tags || !tags.length) return articles
    return articles.filter(a => {
      if (a.tags && a.tags.find(tag => tags.find(t => t.id === tag.id))) return true
      return false
    })
  }, [tags, articles])

  useEffect(() => {
    if (params.id) {
      mainApi.start({
        to: {
          opacity: 0,
          x: -300
        }
      })
      siderApi.start({
        to: {
          opacity: 0,
          x: 300
        }
      })
      listApi.start({
        to: {
          opacity: 0,
          y: 300
        },
        onResolve() {
          if (params.id) {
            fetchCategory(params.id)
            fetchArticles(params.id)
          }
        }
      })
    }
  }, [params])
  return (
    <div
      className={clsx(
        sharedStyled['paint-bg'],
        ' bg-fixed bg-no-repeat bo-cover min-h-[calc(100vh-56px)]'
      )}
      style={style}
    >
      <div className={clsx('h-full min-h-[calc(100vh-56px)] bg-white/80')}>
        <div className="container m-auto bg-red flex relative">
          <div className="flex-1">
            {hasError && (
              <div className="fixed top-0 left-0 bottom-0 right-0">
                <Loading.Nest />
              </div>
            )}
            {categoryDTO && (
              <animated.div className="text-center mt-12 mb-8" style={mainStyle}>
                <div className="inline-flex items-center pb-4 text-3xl sm:text-4xl tracking-tight font-extrabold">
                  <img className="h-16 rounded-full mr-4" src={categoryDTO.defaultPoster} alt="" />
                  <span className="">{categoryDTO.text}</span>
                </div>
                <div className="text-left indent-8 px-4">{categoryDTO.description}</div>
              </animated.div>
            )}

            <animated.div style={listStyle}>
              {!filteredArticles.length && !loadingArticles && (
                <div className="flex items-center text-primary" style={{}}>
                  <NoData className="w-3/5 bg-white/80 rounded-xl" />
                </div>
              )}
              <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 px-4">
                {filteredArticles.map(a => (
                  <ArticleCard key={a.id} data={a} />
                ))}
              </div>
            </animated.div>
          </div>
          <div className="w-[300px]">
            {categoryDTO && (
              <div className="fixed w-[300px] h-[calc(100vh-3.5rem)] top-[3.5rem] py-8">
                <animated.div
                  className="rounded-xl shadow-xl bg-gray-100/30 backdrop-blur-sm mb-4"
                  style={siderStyle}
                >
                  <div className="py-4 px-4">
                    <div>
                      {categoryDTO.belongs && (
                        <span>
                          <span>{categoryDTO.belongs.text}</span>
                          <span className="mx-2">{'>'}</span>
                        </span>
                      )}
                      <img
                        className="inline-block h-8 mr-2 rounded-full"
                        src={categoryDTO.defaultPoster}
                        alt=""
                      />
                      <span>{categoryDTO.text}</span>
                    </div>
                    <div className="pt-4">
                      <ReactSelect
                        placeholder="Select Tags"
                        isClearable
                        isMulti
                        classNames={{
                          control: () => 'bg-transparent rounded-xl'
                        }}
                        styles={{
                          control: _styled => ({
                            ..._styled,
                            background: 'transparent',
                            borderRadius: 8,
                            border: '1px solid #a2a2a1'
                          })
                        }}
                        options={tagOptions}
                        getOptionValue={o => o?.id || ''}
                        getOptionLabel={o => o?.text || ''}
                        value={tags}
                        onChange={_tags => setTags([..._tags])}
                      />
                    </div>
                    <OtherCategory />
                  </div>
                </animated.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogCategory
