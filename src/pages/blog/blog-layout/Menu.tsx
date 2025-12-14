/*
 * @Author: Carlos
 * @Date: 2023-01-13 14:21:15
 * @LastEditTime: 2025-12-13 22:13:00
 * @FilePath: /vite-react-ts/src/pages/blog/blog-layout/Menu.tsx
 * @Description:
 */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '../blog.module.scss'
import { useBlogStore, type SerializedCategory } from '@/stores/useBlogStore'
import type { Category } from '@/interface/blog'
import { classNames } from 'primereact/utils'

const checkHasChildren = (item: SerializedCategory) => item.children && !!item.children.length

function Menu() {
  const navigate = useNavigate()
  const { serializedCategories, fetchCategories } = useBlogStore()

  const linkTo = useCallback(
    (item: Category) => () => {
      navigate(`/blog/category/${item.id}`)
    },
    [navigate]
  )

  const [openId, setOpenId] = useState<string>('')

  const onSummaryClick = useCallback(
    ($event: React.MouseEvent<HTMLDetailsElement>, item: Category) => {
      $event.stopPropagation()
      $event.preventDefault()
      setOpenId(openId === item.id ? '' : item.id)
    },
    [openId, setOpenId]
  )

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <ul className="dark menu menu-horizontal rounded-box px-1">
      {serializedCategories.map(item => {
        const hasChildren = checkHasChildren(item)
        return (
          <li key={item.id} className="mr-4">
            {!hasChildren ? (
              <span
                className="hover:text-white/50 active:bg-white/10"
                onClick={() => {
                  linkTo(item)()
                }}
              >
                {item.text}
              </span>
            ) : (
              <details open={openId === item.id} onClick={e => onSummaryClick(e, item)}>
                <summary>{item.text}</summary>
                <ul className="p-2 rounded-box">
                  {item.children!.map(subItem => {
                    return (
                      <li
                        key={subItem.id}
                        className={classNames(styled['bg-escape'], 'rounded-box')}
                        onClick={linkTo(subItem)}
                      >
                        <span className="hover:text-white/50 active:bg-white/10">
                          {subItem.text}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </details>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
