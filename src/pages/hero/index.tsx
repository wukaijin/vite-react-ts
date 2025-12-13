/*
 * @Author: Carlos
 * @Date: 2023-01-11 13:00:34
 * @LastEditTime: 2023-01-16 14:36:37
 * @FilePath: /vite-react-swc/src/pages/hero/index.tsx
 * @Description:
 */
import { type CSSProperties, useLayoutEffect } from 'react'
import { Close, HamburgerButton } from '@icon-park/react'
import { useToggle } from 'ahooks'
import clsx from 'clsx'
import { useSpring, useSprings, animated } from '@react-spring/web'
import styled from './hero.module.scss'
import { throttle } from '@/utils'
import Menu from './Menu'
import withLicense from '@/components/shared/withLicense'

const headingChars: string[] = Array.from('Welcome to my website!')
const headingCharsLength = headingChars.length

const Hello = () => {
  const [open, { toggle }] = useToggle()
  const [firstIn, { toggle: toggleFirst }] = useToggle(true)
  const [animateDone, { toggle: toggleAnimateDone }] = useToggle(false)
  const [springs, apis] = useSprings(headingCharsLength, () => ({
    from: { opacity: 0, y: 120 }
  }))
  const [maskStyles, maskApi] = useSpring(
    {
      from: {
        '--x': '70%',
        '--y': '50%',
        '--mask-size-1': '0%',
        '--mask-size-2': '0%',
        '--mask-size-3': '0%'
      }
    },
    []
  )
  useLayoutEffect(() => {
    const listener = throttle((e: MouseEvent) => {
      console.log(e)
      const { clientX, clientY } = e
      const x = Math.round((clientX / window.innerWidth) * 100)
      const y = Math.round((clientY / window.innerHeight) * 100)
      maskApi.start({
        to: {
          '--x': `${x}%`,
          '--y': `${y}%`,
          '--mask-size-1': '16%',
          '--mask-size-2': '28%',
          '--mask-size-3': '28.1%'
        }
      })
    }, 100)
    apis.start(i => ({
      to: { opacity: 1, y: 0 },
      delay: i * 100 + 2000
    }))
    maskApi.start({
      to: {
        '--mask-size-1': '16%'
      },
      delay: headingCharsLength * 100 + 3000
    })
    maskApi.start({
      to: {
        '--mask-size-2': '28%',
        '--mask-size-3': '28.1%'
      },
      delay: headingCharsLength * 100 + 3600,
      onResolve() {
        window.addEventListener('mousemove', listener)
        toggleAnimateDone()
      }
    })
    return () => window.removeEventListener('mousemove', listener)
  }, [])

  return (
    <div className={styled['hero-root']}>
      <div className={styled['hero-wrapper']}>
        <div className={styled.hero}>
          <div className={styled.heading}>
            {springs.map((style, index) => (
              <animated.span key={index} className="inline-block" style={style}>
                {headingChars[index] === ' ' ? <>&nbsp;</> : headingChars[index]}
              </animated.span>
            ))}
          </div>
        </div>
        <animated.div
          className={clsx(styled.hero, styled['hero-secondary'])}
          style={{
            ...(maskStyles as CSSProperties)
          }}
        >
          <div className={styled['heading-secondary']}>Welcome to my website!</div>
        </animated.div>
      </div>
      <Menu open={open} />
      <button
        className={clsx('btn btn-ghost hover:animate-none transition-all]', styled['menu-button'], {
          'bg-black/60': open,
          'animate-ping': firstIn && animateDone
        })}
        onClick={() => {
          if (firstIn) toggleFirst()
          toggle()
        }}
      >
        {!open && <HamburgerButton theme="filled" className="font-base text-2xl" />}
        {open && <Close theme="filled" className="font-base  text-2xl" />}
      </button>
    </div>
  )
}
const HeroPage = withLicense(Hello)
export default HeroPage
