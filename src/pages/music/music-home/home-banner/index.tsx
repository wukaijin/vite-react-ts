/*
 * @Author: Carlos
 * @Date: 2023-01-08 23:22:48
 * @LastEditTime: 2023-01-09 17:39:15
 * @FilePath: /vite-react-swc/src/pages/music/music-home/home-banner/index.tsx
 * @Description:
 */
import { memo, useState } from 'react'
import { useMount } from 'ahooks'
import { BannerInfo } from '@/interface/music'
import './index.scss'
import { queryBanner } from '@/api/music'
import ImageFallback from '@/components/enhance/ImageFallback'

type Props = {}
const HomeBanner = memo<Props>(() => {
  const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null)
  const [banners, setBanners] = useState<BannerInfo[]>([])
  const [padding, setPadding] = useState('0px')
  const [translateZ, setTranslateZ] = useState('0px')

  useMount(async () => {
    if (wrapperEl) {
      const width = wrapperEl.offsetWidth
      setPadding(`${width / 180 - 0.5}rem 0 ${width / 140 - 0.5}rem`)
      setTranslateZ(`${width / 28}rem`)
    }
    const bas = await queryBanner()
    setBanners(bas)
  })
  return (
    <div ref={setWrapperEl} className="carousel-3d-wrapper" style={{ padding }}>
      <div className="carousel-3d-content">
        {banners.length &&
          banners.slice(0, 6).map((b, index) => {
            return (
              <div
                key={b.pic}
                className="carousel-3d-card"
                style={{
                  ['--i' as any]: index,
                  transform: `rotateY(calc(var(--i) * 60deg)) translateZ(${translateZ})`
                }}
              >
                <ImageFallback
                  src={b.pic}
                  placeholder={<div className="carousel-3d-placeholder" />}
                />
              </div>
            )
          })}
        {!banners.length && (
          <div className="carousel-3d-card" style={{}}>
            <div className="carousel-3d-placeholder" />
          </div>
        )}
      </div>
    </div>
  )
})
export default HomeBanner
