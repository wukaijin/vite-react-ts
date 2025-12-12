/*
 * @Author: Carlos
 * @Date: 2023-01-09 13:29:25
 * @LastEditTime: 2023-01-09 13:37:06
 * @FilePath: /vite-react-swc/src/components/enhance/ImageFallback.tsx
 * @Description:
 */
import { useMount } from 'ahooks'
import { HTMLAttributes, useState, ReactNode } from 'react'

type Props = {
  src: string
  placeholder: ReactNode
  imageProps?: HTMLAttributes<HTMLImageElement>
}

const ImageFallback = ({ src, placeholder, imageProps = {} }: Props) => {
  const [done, setDone] = useState(false)
  useMount(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setDone(true)
    }
  })
  if (done) return <img {...imageProps} src={src} alt="" />
  return placeholder
}
export default ImageFallback
