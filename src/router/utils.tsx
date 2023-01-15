/*
 * @Author: Carlos
 * @Date: 2023-01-14 16:09:13
 * @LastEditTime: 2023-01-14 16:10:19
 * @FilePath: /vite-react-swc/src/router/utils.tsx
 * @Description: 
 */
import { lazy, Suspense } from 'react'

export function withSuspense(Comp: ReturnType<typeof lazy>, fallback?: JSX.Element) {
  return (
    <Suspense fallback={fallback || null}>
      <Comp />
    </Suspense>
  )
}

export default {}
