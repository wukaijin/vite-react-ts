/*
 * @Author: Carlos
 * @Date: 2023-01-13 14:21:15
 * @LastEditTime: 2023-01-14 14:56:48
 * @FilePath: /vite-react-swc/src/pages/blog/blog-layout/Menu.tsx
 * @Description:
 */
import styled from '../blog.module.scss'

const menus = [
  {
    content: 'Resent',
    
  },
  {
    content: 'Frontend',
    sub: [
      {
        content: 'CSS'
      },
      {
        content: 'JavaScript'
      }
    ]
  },
  {
    content: 'Backend',
    sub: [
      {
        content: 'Database'
      },
      {
        content: 'Server'
      }
    ]
  },
  {
    content: 'OP',
    sub: [
      {
        content: 'Shell'
      },
      {
        content: 'Docker'
      }
    ]
  },
  {
    content: 'Chore'
  }
]
type Props = {}
function Menu({}: Props) {
  return (
    <ul className="menu menu-horizontal px-1">
      {menus.map((item, index) => {
        return (
          <li key={index} className="">
            <span className="hover:text-white/50 active:bg-white/10">
              {item.content}
              {item.sub && item.sub.length && (
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
            {item.sub && item.sub.length && (
              <ul className="p-2">
                {item.sub.map((subItem, i) => {
                  return (
                    <li key={i} className={styled['bg-escape']}>
                      <span className="hover:text-white/50 active:bg-white/10">
                        {subItem.content}
                      </span>
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
