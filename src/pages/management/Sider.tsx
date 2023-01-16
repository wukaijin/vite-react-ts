/*
 * @Author: Carlos
 * @Date: 2023-01-14 15:41:37
 * @LastEditTime: 2023-01-15 22:00:59
 * @FilePath: /vite-react-swc/src/pages/management/Sider.tsx
 * @Description:
 */
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

type Props = {
  visible: boolean
}
const Sider = (props: Props) => {
  const { visible } = props
  return (
    <div
      className={clsx(
        {
          'basis-[240px]': visible,
          'basis-[0px]': !visible
        },
        'transition-all'
      )}
    >
      <div
        className={clsx(
          'fixed  h-[calc(100vh-4rem)] top-[4rem] pb-4 bg-base-100 border-r transition-all overflow-hidden',
          {
            'w-[240px]': visible,
            'w-[0px]': !visible
          }
        )}
      >
        <ul className="menu menu-compact bg-base-100 w-full p-2 rounded-box">
          <li className="menu-title">
            <span>Blog</span>
          </li>
          <li>
            <NavLink
              to="/management/blog/categories"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/management/blog/tags"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Tags
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/management/blog/articles"
              className={({ isActive }) => (isActive ? 'active  ' : undefined)}
            >
              Articles
            </NavLink>
          </li>
          <li className="menu-title">
            <span>Music</span>
          </li>
          <li>
            <span>Pending...</span>
          </li>
          <li>
            <span>Building...</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sider
