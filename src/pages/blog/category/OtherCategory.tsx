import { useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { RootState } from '@/store'
import { Category } from '@/interface/blog'

/*
 * @Author: Carlos
 * @Date: 2023-01-19 22:44:02
 * @LastEditTime: 2023-01-19 23:33:39
 * @FilePath: /vite-react-swc/src/pages/blog/category/OtherCategory.tsx
 * @Description:
 */
const connector = connect(
  (state: RootState) => ({ serializedCategories: state.blog.serializedCategories }),
  null
)
type Props = ConnectedProps<typeof connector>
function OtherCategory(props: Props) {
  const params = useParams()
  const navigate = useNavigate()

  const linkTo = useCallback(
    (item: Category) => () => {
      if (params.id === item.id) return
      navigate(`../${item.id}`, { relative: 'path' })
    },
    [navigate, params]
  )

  return (
    <div className="py-4">
      <div className="pb-2">
        <span>Other Category:</span>
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
                            className={clsx(
                              'cursor-pointer hover:text-sky-700/50 active:bg-white/10',
                              {
                                'text-sky-700/80 hover:text-sky-700/80 cursor-text': params.id === subItem.id
                              }
                            )}
                            onClick={linkTo(subItem)}
                          >
                            {subItem.text}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : (
                <span
                  className={clsx('cursor-pointer hover:text-sky-700/50 active:bg-white/10', {
                    'text-sky-700/80 hover:text-sky-700/80 cursor-text': params.id === item.id
                  })}
                  onClick={linkTo(item)}
                >
                  {item.text}
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
