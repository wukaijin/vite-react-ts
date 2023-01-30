/*
 * @Author: Carlos
 * @Date: 2023-01-16 14:11:09
 * @LastEditTime: 2023-01-29 17:35:56
 * @FilePath: /vite-react-swc/src/pages/blog/blog-hero/index.tsx
 * @Description:
 */
import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import ResentPosts from './ResentPost'
import useImage from '@/hooks/useImage'
import Loading from '@/components/base/Loading'
import styled from './blog-hero.module.scss'
import sharedStyled from '../blog.module.scss'

const CARD_IMAGE = '/static-api/blog/undraw_augmented_reality.svg'
const CLOUD_BG = '/static-api/blog/cloud.png'
const MOUNTAIN_BG = '/static-api/blog/painting-bg-m.png'

type Props = {}
function BlogHero({}: Props) {
  const [personStyles, personApi] = useSpring(() => ({
    from: { opacity: 0, x: -300 }
  }))
  const [textStyles, textApi] = useSpring(() => ({
    from: { opacity: 0, y: 300 }
  }))
  const [imageStyles, imageApi] = useSpring(() => ({
    from: { opacity: 0, x: 300 }
  }))
  const [resentStyles, resentApi] = useSpring(() => ({
    from: { opacity: 0, y: 300 }
  }))

  const { done: cardImageDone } = useImage(CARD_IMAGE)
  const { done: mountainBgDone } = useImage(MOUNTAIN_BG)

  useLayoutEffect(() => {
    if (!cardImageDone) return
    const baseDelay = 300
    personApi.start({
      to: { opacity: 1, x: 0 },
      delay: baseDelay,
      config: { duration: 500 }
    })
    textApi.start({
      to: { opacity: 1, y: 0 },
      delay: baseDelay + 300,
      config: { duration: 800 }
    })
    imageApi.start({
      to: { opacity: 1, x: 0 },
      delay: baseDelay + 600,
      config: { duration: 500 }
    })
    resentApi.start({
      to: { opacity: 1, y: 0 },
      delay: baseDelay + 1000,
      config: { duration: 500 }
    })
  }, [cardImageDone, mountainBgDone])

  return (
    <div className={clsx(sharedStyled['paint-bg'], ' bg-fixed min-h-[calc(100vh-56px)]')}>
      {(!cardImageDone || !mountainBgDone) && (
        <div className="fixed mt-32 mx-auto text-center w-full">
          <Loading.Circle />
        </div>
      )}
      <div className="relative">
        <div
          className="bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${CLOUD_BG})`
          }}
        >
          <div className="w-full sm:max-w-[960px] m-auto pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="text-right">
                <div className="pr-12">
                  <animated.div
                    className="inline-flex justify-center items-center rounded-xl px-6 py-4"
                    style={{ ...personStyles }}
                  >
                    <div className="mt-6 mb-2 mr-8">
                      <img
                        className="h-[100px] aspect-square rounded-[30%] bg-gray-100"
                        style={{
                          boxShadow: '-5px -5px 8px #ffffff7a, 5px 5px 8px #a9a9aa7a'
                        }}
                        alt=""
                        src="https://i.ibb.co/kKrFWfS/Wechat-IMG28.jpg"
                      />
                    </div>
                    <div className="mt-2">
                      <div className={clsx(styled.info, 'info text-center mt-2')}>
                        <p className="font-bold text-xl">Carlos Woo</p>
                        <p className="font-bold text-sm">Web Dev</p>
                      </div>
                      <button
                        className={clsx(styled.button, 'mt-3 color-white px-4 py-1 rounded-xl')}
                      >
                        Contact
                      </button>
                    </div>
                  </animated.div>
                </div>
                <animated.div className="text-left text-xl px-4" style={{ ...textStyles }}>
                  <p className="text-2xl text-left">Hello, this is Carlos. </p>
                  <p>
                    This blog records some personal experience in learning programming, and the
                    articles would be write with Markdown syntax. It is more about notes
                    or snippets than tutorials.
                  </p>
                  <p>Thanks for visit!</p>
                </animated.div>
              </div>
              <div className="pt-12">
                <animated.div style={{ ...imageStyles }}>
                  <img src={CARD_IMAGE} alt="" />
                </animated.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <animated.div
        className={clsx('container sm:min-w-[600px] lg:max-w-[1200px] m-auto')}
        style={{
          ...resentStyles
        }}
      >
        <ResentPosts />
      </animated.div>
    </div>
  )
}
export default BlogHero
