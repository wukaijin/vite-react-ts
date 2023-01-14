/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:00:33
 * @LastEditTime: 2023-01-13 01:48:03
 * @FilePath: /vite-react-swc/src/pages/hero/Menu.tsx
 * @Description: 
 */
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useSpring, useSprings, animated } from '@react-spring/web'
import styled from './hero.module.scss'
import Logo from '@/components/shared/logo'

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
        <li>
          <Link to="/todos">TodoList</Link>
        </li>
        <li>
          <Link to="/music/home">❤ Music</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/introduction">???</Link>
        </li>
      </ul>
    </div>
  )
}
export default HeroMenu
