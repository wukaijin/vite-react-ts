/*
 * @Author: Carlos
 * @Date: 2023-01-12 15:05:51
 * @LastEditTime: 2023-01-12 15:30:15
 * @FilePath: /vite-react-swc/src/components/shared/logo.tsx
 * @Description:
 */
import { CSSProperties, HTMLAttributes, memo } from 'react'
import logo from '@/assets/logo.png'

const generateBack: (deg: number) => CSSProperties = (deg: number) => ({
  filter: `hue-rotate(${deg}deg)`
})

type Props = HTMLAttributes<HTMLImageElement> & {
  colorDeg?: number
}
const Logo = memo((props: Props) => {
  const { colorDeg, style = {}, ...resProps } = props
  const mergedStyle = { ...style, ...(colorDeg ? generateBack(colorDeg) : {}) }
  return <img src={logo} alt="" style={mergedStyle} {...resProps} />
})
export default Logo
