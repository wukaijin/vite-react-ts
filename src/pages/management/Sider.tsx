import { useNavigate } from 'react-router-dom'

/*
 * @Author: Carlos
 * @Date: 2023-01-14 15:41:37
 * @LastEditTime: 2023-01-14 16:12:23
 * @FilePath: /vite-react-swc/src/pages/management/Sider.tsx
 * @Description:
 */
type Props = {}
const Sider = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className="basis-[240px]">
      <div className="fixed w-[240px] h-[calc(100vh-4rem)] top-[4rem] pb-4 bg-base-100 border-r">
        <ul className="menu bg-base-100 w-full p-2 rounded-box">
          <li className="menu-title">
            <span>Blog</span>
          </li>
          <li onClick={() => navigate('/management/blog/modules')}>
            <span>Modules</span>
          </li>
          <li onClick={() => navigate('/management/blog/tags')}>
            <span>Tags</span>
          </li>
          <li onClick={() => navigate('/management/blog/articles')}>
            <span>Articles</span>
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
