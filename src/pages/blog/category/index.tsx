/*
 * @Author: Carlos
 * @Date: 2023-01-19 14:26:08
 * @LastEditTime: 2023-01-19 23:13:52
 * @FilePath: /vite-react-swc/src/pages/blog/category/index.tsx
 * @Description:
 */
import { CSSProperties, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMount, useRequest } from 'ahooks'
import ReactSelect from 'react-select'
import clsx from 'clsx'
import { CategoryApi } from '@/api/blog'
import sharedStyled from '../blog.module.scss'
import ArticleCard from '../ArticleCard'
import { Tag } from '@/interface/blog'
import OtherCategory from './OtherCategory'

const tagOptions: Partial<Tag>[] = [
  {
    text: 'Vue',
    id: '123',
    color: '#346700'
  },
  {
    text: 'Angular',
    id: '122',
    color: '#ff0098'
  },
  {
    text: 'React',
    id: '142',
    color: '#0067ff'
  }
]

type Props = {}
const BlogCategory = (props: Props) => {
  const [hasError, setHasError] = useState<boolean>(false)
  const [tag, setTag] = useState()
  const params = useParams<string>()
  const [style, setStyle] = useState<CSSProperties>({})
  const {
    data: categoryDTO,
    loading: loadingTag,
    runAsync: fetchTag
  } = useRequest(CategoryApi.findOne, {
    manual: true,
    onSuccess(d) {
      if (!d) {
        setHasError(true)
        return
      }
      setStyle({ backgroundImage: `url(${d.defaultPoster})` })
    },
    onError() {
      setHasError(true)
    }
  })
  useEffect(() => {
    if (params.id) {
      fetchTag(params.id)
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
      <div className={clsx('h-full bg-white/70')}>
        <div className="container m-auto bg-red flex relative">
          <div className="flex-1">
            {hasError && <div>error</div>}
            {categoryDTO && (
              <div className="text-center mt-12 mb-8">
                <div className="inline-flex items-center pb-4 text-3xl sm:text-4xl tracking-tight font-extrabold">
                  <img className="h-16 rounded-full mr-4" src={categoryDTO.defaultPoster} alt="" />
                  <span className="">{categoryDTO.text}</span>
                </div>
                <div className="text-left indent-8 px-4">
                  JavaScript is a high-level, dynamic, untyped, and interpreted programming
                  language. It has been standardized in the ECMAScript language specification.
                  Alongside HTML and CSS, it is one of the three core technologies of World Wide Web
                  content production; the majority of websites employ it and it is supported by all
                  modern Web browsers without plug-ins.
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 px-4">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
          <div className="w-[300px]">
            {categoryDTO && (
              <div className="fixed w-[300px] h-[calc(100vh-3.5rem)] top-[3.5rem] py-8">
                <div className="rounded-xl shadow-xl bg-gray-100/30 backdrop-blur-sm mb-4">
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
                          control: () => 'bg-transparent rounded-xl border-red'
                        }}
                        styles={{
                          control: _styled => ({
                            ..._styled,
                            background: 'transparent',
                            borderRadius: 8
                          })
                        }}
                        options={tagOptions}
                        getOptionValue={o => o?.id || ''}
                        getOptionLabel={o => o?.text || ''}
                        value={tag}
                        onChange={_tag => setTag(tag)}
                      />
                    </div>
                    <OtherCategory />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogCategory
