/*
 * @Author: Carlos
 * @Date: 2023-01-08 23:22:48
 * @LastEditTime: 2023-01-09 10:22:42
 * @FilePath: /vite-react-swc/src/pages/music/homeBanner/index.tsx
 * @Description:
 */
import { useState } from 'react'
import { useMount } from 'ahooks'
import { BannerInfo } from '@/interface/music'
import './index.scss'
import { queryBanner } from '@/api/music'

type Props = {}
export default function HomeBanner({}: Props) {
  const [banners, setBanners] = useState<BannerInfo[]>([])

  useMount(async () => {
    const bas = await queryBanner()
    console.log('bas', bas)
    setBanners(bas)
  })
  if (!banners.length) {
    return null
  }
  // const [pre, cur, next] = banners
  return (
    <div className="carousel-3d-wrapper">
      <div className="carousel-3d-content">
        {banners.slice(0, 6).map((b, index) => {
          return (
            <div
              className="carousel-3d-card"
              style={{ ['--i' as any]: index, backgroundImage: `url(${b.pic})` }}
            />
          )
        })}
      </div>
    </div>
  )
}
