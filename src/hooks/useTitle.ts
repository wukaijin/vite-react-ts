/*
 * @Author: Carlos
 * @Date: 2023-05-22 18:25:55
 * @LastEditTime: 2023-05-22 18:30:31
 * @FilePath: /vite-react-ts/src/hooks/useTitle.ts
 * @Description: null
 */
import { useEffect } from 'react'

export default function useTitle(title: string) {
  useEffect(() => {
    window.document.title = title
  }, [title])
}
