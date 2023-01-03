/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:05:11
 * @LastEditTime: 2023-01-03 03:58:07
 * @FilePath: /vite-react-swc/src/utils/index.ts
 * @Description:
 */
export const getUniqueId: () => string = () => Math.random().toString(36).substring(2, 10)

/**  eslint disable */
export function throttle<T>(func: T, wait: number): T {
  let timer = 0
  let lastDate = 0
  return function (this: T, ...args: any) {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    const now = +new Date()
    const remainDate = wait - (now - lastDate)
    if (remainDate <= 0) {
      lastDate = now
      if (typeof func === 'function') {
        func.apply(this, args)
      }
    } else {
      timer = window.setTimeout(() => {
        lastDate = +new Date()
        if (typeof func === 'function') {
          func.apply(this, args)
        }

        timer = 0
      }, remainDate)
    }
  } as T
}
/** eslint enable */
export default {}
