/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:05:51
 * @LastEditTime: 2023-01-29 02:10:08
 * @FilePath: /vite-react-ts/src/components/shared/logo.tsx
 * @Description:
 */
import { useMount, useSize } from 'ahooks'
import clsx from 'clsx'
import { CSSProperties, HTMLAttributes, memo, useRef, useState } from 'react'
import styled from './shared.module.scss'
// import logo from '@/assets/logo.png'

const logo = '/static-api/logo/transformer-256.png'

const generateBack: (deg: number) => CSSProperties = (deg: number) => ({
  filter: `hue-rotate(${deg}deg)`
})
// radial-gradient(150px 110px at 50% 50%,red,yellow,pink)
type Props = HTMLAttributes<HTMLImageElement> & {
  colorDeg?: number
}
const Logo = memo((props: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [gradientRadius, setGradientRadius] = useState<string>('14px')
  const imgSize = useSize(imgRef)
  useMount(() => {
    if (imgSize) {
      setGradientRadius(`${(imgSize.height * (14 / 32)).toFixed(2)}px`)
    }
  })
  const { colorDeg, style = {}, className, ...resProps } = props
  const mergedStyle = {
    ...style,
    '--gradient-radius': gradientRadius, // ${gradientRadius}
    ...(colorDeg ? generateBack(colorDeg) : {})
  }
  return (
    <img
      ref={imgRef}
      src={logo}
      alt=""
      className={clsx(styled['logo-eye'], className)}
      style={mergedStyle}
      {...resProps}
    />
  )
})
export default Logo
