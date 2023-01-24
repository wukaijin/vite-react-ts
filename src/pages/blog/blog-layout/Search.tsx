/*
 * @Author: Carlos
 * @Date: 2023-01-24 16:11:27
 * @LastEditTime: 2023-01-24 17:17:07
 * @FilePath: /vite-react-swc/src/pages/blog/blog-layout/Search.tsx
 * @Description:
 */
import { useNavigate } from 'react-router-dom'
import { useClickAway, useDebounceFn, useKeyPress, useRequest } from 'ahooks'
import clsx from 'clsx'
import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { ArticleApi } from '@/api/blog'

type Props = {}
const Search = (props: Props) => {
  const searchRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [activeId, setActiveId] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const navigate = useNavigate()
  const { data: list = [], run: search } = useRequest(ArticleApi.searchByKeyword, { manual: true })
  useClickAway(() => {
    setVisible(false)
  }, searchRef)
  const deferKeyword = useDeferredValue(keyword)
  const { run: debounceSearch } = useDebounceFn(search)
  useEffect(() => {
    debounceSearch(deferKeyword)
  }, [deferKeyword])

  useKeyPress('uparrow', e => {
    if (!visible) return
    if (list && list.length) {
      if (!activeId) {
        setActiveId(list[list.length - 1].id)
      } else {
        const index = list.findIndex(a => a.id === activeId)
        const nextIndex = index - 1 < 0 ? list.length - 1 : index - 1
        setActiveId(list[nextIndex].id)
      }
      e.preventDefault()
    }
  })

  useKeyPress('enter', e => {
    if (!visible) return
    if (list && list.length) {
      if (activeId) {
        const article = list.find(a => a.id === activeId)
        if (article) {
          navigate(`/blog/article/${article.id}`)
        }
      }
      e.preventDefault()
    }
  })

  // keyCode value for ArrowDown
  useKeyPress(40, e => {
    if (!visible) return
    if (list && list.length) {
      if (!activeId) {
        setActiveId(list[0].id)
      } else {
        const index = list.findIndex(a => a.id === activeId)
        const nextIndex = index + 1 >= list.length ? 0 : index + 1
        setActiveId(list[nextIndex].id)
      }
      e.preventDefault()
    }
  })
  return (
    <div ref={searchRef} className="relative">
      <input
        type="text"
        className={clsx(
          'input input-ghost input-sm transition-all',
          'text-white/50 border border-white/40 w-[12rem] focus:w-[25vw] placeholder:text-white/50'
        )}
        placeholder="Search"
        value={keyword}
        onFocus={() => setVisible(true)}
        // onBlur={() => {
        //   setVisible(false)
        //   setActiveId('')
        // }}
        onChange={e => setKeyword(e.target.value)}
      />
      <ul
        className={clsx(
          'absolute top-9 bg-white rounded-lg w-[25vw] border overflow-hidden text-slate-700/90',
          {
            hidden: !visible || !list || !list.length
          }
        )}
      >
        {list &&
          !!list.length &&
          list.map(article => (
            <li
              key={article.id}
              className={clsx('leading-6 cursor-pointer  px-2 py-1', {
                'bg-sky-700 text-white hover:text-white': activeId === article.id,
                'hover:text-slate-700/60': activeId !== article.id
              })}
              onClick={() => {
                navigate(`/blog/article/${article.id}`)
                setVisible(false)
              }}
            >
              {article.category && <span className="mr-1">[{article.category?.text}]</span>}
              <span className=" ">{article.title}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default Search
