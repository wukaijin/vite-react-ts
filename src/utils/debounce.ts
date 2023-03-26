/*
 * @Author: Carlos
 * @Date: 2023-02-16 16:15:16
 * @LastEditTime: 2023-02-16 16:33:17
 * @FilePath: /vite-react-swc/src/utils/debounce.ts
 * @Description: debounce
 */

function debounce<T extends Function>(func: T, duration?: number) {
  duration = duration || 500
  let timer: NodeJS.Timeout | null
  return function (this: ThisType<T>, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      if (typeof func === 'function') {
        func.apply(this, args)
      }
    }, duration)
  }
}
export default debounce
