/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:09:13
 * @LastEditTime: 2023-01-31 17:59:41
 * @FilePath: /vite-react-ts/src/router/utils.tsx
 * @Description:
 */
import { lazy, Suspense } from 'react'
import Loading from '@/components/base/Loading'

const placeholder = (
  <div className="fixed top-0 left-0 bottom-0 right-0">
    <Loading.Nest />
  </div>
)

export function withSuspense(Comp: ReturnType<typeof lazy>, fallback?: JSX.Element) {
  return (
    <Suspense fallback={fallback || placeholder}>
      <Comp />
    </Suspense>
  )
}

export default {}
