/*
 * @Author: Carlos
 * @Date: 2023-01-13 14:21:15
 * @LastEditTime: 2025-12-13 22:13:00
 * @FilePath: /vite-react-ts/src/pages/blog/blog-layout/Menu.tsx
 * @Description:
 */
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../blog.module.scss'
import { useBlogStore } from '@/stores/useBlogStore'
import type { Category } from '@/interface/blog'

function Menu() {
  const navigate = useNavigate()
  const { serializedCategories, fetchCategories } = useBlogStore()

  const linkTo = useCallback(
    (item: Category) => () => {
      navigate(`/blog/category/${item.id}`)
    },
    [navigate]
  )

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <ul className="menu menu-horizontal px-1">
      {serializedCategories.map(item => {
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

export default Menu
