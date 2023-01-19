/*
 * @Author: Carlos
 * @Date: 2023-01-18 21:53:49
 * @LastEditTime: 2023-01-18 21:56:21
 * @FilePath: /vite-react-swc/src/utils/ImagePromise.ts
 * @Description: 
 */
const ImagePromise = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = resolve
    image.onerror = reject
  })
export default ImagePromise
