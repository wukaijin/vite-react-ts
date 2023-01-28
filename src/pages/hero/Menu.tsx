/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:00:33
 * @LastEditTime: 2023-01-22 13:12:44
 * @FilePath: /vite-react-swc/src/pages/hero/Menu.tsx
 * @Description: 
 */
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styled from './hero.module.scss'
import Logo from '@/components/shared/Logo'

type Props = {
  open: boolean
}

const HeroMenu = (props: Props) => {
  const { open } = props
  return (
    <div
      className={clsx(styled.menu, {
        [styled['is-open']]: open
      })}
    >
      <Logo colorDeg={80} className="absolute top-6 left-6 w-8 h-8" />
      <ul className="menu bg-white/10 backdrop-blur-sm text-secondary-content w-56 rounded-box">
        {/* <li>
          <Link to="/todos">TodoList</Link>
        </li> */}
        <li>
          <Link to="/music/home">❤ Music</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </div>
  )
}
export default HeroMenu
