/*
 * @Author: Carlos
 * @Date: 2023-01-18 21:57:16
 * @LastEditTime: 2023-01-18 22:04:45
 * @FilePath: /vite-react-swc/src/hooks/useImage.ts
 * @Description: 
 */
import { useEffect, useState } from 'react'
import ImagePromise from '@/utils/ImagePromise'

function useImage(src: string) {
  const [loading, toggleLoading] = useState(false)
  const [done, toggleDone] = useState(false)
  useEffect(() => {
    toggleLoading(true)
    toggleDone(false)
    ImagePromise(src).finally(() => {
      toggleLoading(false)
      toggleDone(true)
    })
  }, [src])
  return {
    loading,
    done
  }
}

export default useImage
