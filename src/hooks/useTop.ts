/*
 * @Author: Carlos
 * @Date: 2023-05-10 15:29:42
 * @LastEditTime: 2023-05-10 15:33:42
 * @FilePath: /vite-react-swc/src/hooks/useTop.ts
 * @Description: null
 */
import { useEffect } from 'react'

export default function useTop() {
  useEffect(() => window.scrollTo(0, 0), [])
}
