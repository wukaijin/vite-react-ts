/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:00:33
 * @LastEditTime: 2023-03-26 09:03:00
 * @FilePath: /vite-react-ts/src/pages/hero/Menu.tsx
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
      <ul className="font-blog text-5xl leading-tight text-secondary-content rounded-box text-left align-bottom pb-24">
        <li>
          <Link to="/music/home" target="_blank">
            <div className={clsx(styled['menu-item'])}>
              <span className={clsx(styled['menu-item-a'])}>Music</span>
              <span className={clsx(styled['menu-item-b'], 'text-sky-400')}>Music</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/blog" target="_blank">
            <div className={clsx(styled['menu-item'])}>
              <span className={clsx(styled['menu-item-a'])}>Blog</span>
              <span className={clsx(styled['menu-item-b'], 'text-orange-400')}>Blog</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default HeroMenu
