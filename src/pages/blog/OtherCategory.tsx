import { useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { RootState } from '@/store'
import { Category } from '@/interface/blog'
import styled from './blog.module.scss'
/*
 * @Author: Carlos
 * @Date: 2023-01-19 22:44:02
 * @LastEditTime: 2023-01-23 00:37:03
 * @FilePath: /vite-react-swc/src/pages/blog/OtherCategory.tsx
 * @Description:
 */
const connector = connect(
  (state: RootState) => ({ serializedCategories: state.blog.serializedCategories }),
  null
)
type Props = ConnectedProps<typeof connector> & {
  title?: string
}
function OtherCategory(props: Props) {
  const params = useParams()
  const navigate = useNavigate()

  const linkTo = useCallback(
    (item: Category) => () => {
      if (params.id === item.id) return
      navigate(`/blog/category/${item.id}`)
    },
    [navigate, params]
  )

  return (
    <div className="py-4">
      <div className="pb-2">
        <span>{props.title || 'Other Category'}:</span>
      </div>
      <ul className="">
        {props.serializedCategories.map((item, index) => {
          return (
            <li key={item.id} className="pl-2">
              {item.children && !!item.children.length ? (
                <>
                  <div className="text-gray-500/70">
                    <span>{item.text}</span>
                  </div>
                  <ul className="px-2">
                    {item.children.map(subItem => {
                      return (
                        <li key={subItem.id}>
                          <span
                            className={clsx(styled['category-guide'], {
                              [styled.active]: params.id === subItem.id
                            })}
                            onClick={linkTo(subItem)}
                          >
                            {item.defaultPoster && (
                              <img className={styled.poster} src={subItem.defaultPoster} alt="" />
                            )}
                            <span>{subItem.text}</span>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : (
                <span
                  className={clsx(styled['category-guide'], {
                    [styled.active]: params.id === item.id
                  })}
                  onClick={linkTo(item)}
                >
                  {item.defaultPoster && (
                    <img className={styled.poster} src={item.defaultPoster} alt="" />
                  )}
                  <span>{item.text}</span>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default connector(OtherCategory)
