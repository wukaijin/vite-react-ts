/*
 * @Author: Carlos
 * @Date: 2023-01-13 14:21:15
 * @LastEditTime: 2023-01-20 00:30:31
 * @FilePath: /vite-react-swc/src/pages/blog/blog-layout/Menu.tsx
 * @Description:
 */
import { useCallback, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/store'
import styled from '../blog.module.scss'
import { asyncFetchCategories } from '@/store/blog'
import { Category } from '@/interface/blog'

const connector = connect(
  (state: RootState) => {
    const { categories, serializedCategories } = state.blog
    return {
      categories,
      serializedCategories
    }
  },
  { fetchData: asyncFetchCategories }
)

type Props = ConnectedProps<typeof connector>
function Menu(props: Props) {
  const navigate = useNavigate()
  const linkTo = useCallback(
    (item: Category) => () => {
      navigate(`../${item.id}`, { relative: 'path' })
    },
    [navigate]
  )
  useEffect(() => {
    props.fetchData()
  }, [])
  return (
    <ul className="menu menu-horizontal px-1">
      {props.serializedCategories.map(item => {
        return (
          <li key={item.id} className="">
            <span
              className="hover:text-white/50 active:bg-white/10"
              onClick={() => {
                if (item.children && !!item.children.length) return
                linkTo(item)()
              }}
            >
              {item.text}
              {item.children && !!item.children.length && (
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              )}
            </span>
            {item.children && !!item.children.length && (
              <ul className="p-2">
                {item.children.map(subItem => {
                  return (
                    <li key={subItem.id} className={styled['bg-escape']} onClick={linkTo(subItem)}>
                      <span className="hover:text-white/50 active:bg-white/10">{subItem.text}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default connector(Menu)
