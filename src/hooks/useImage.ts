/*
 * @Author: Carlos
 * @Date: 2023-01-18 21:57:16
 * @LastEditTime: 2023-01-18 22:04:45
 * @FilePath: /vite-react-ts/src/hooks/useImage.ts
 * @Description:
 */
import { useEffect, useState } from 'react'
import ImagePromise from '@/utils/ImagePromise'

function useImage(src: string) {
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  // 在渲染期间检测 src 变化并重置状态（React 推荐模式）
  // 这样可以避免在 effect 中同步调用 setState
  if (src !== currentSrc) {
    setLoading(true)
    setDone(false)
    setCurrentSrc(src)
  }

  useEffect(() => {
    // 标记组件是否已卸载，防止内存泄漏
    let cancelled = false

    // effect 只负责异步操作，不同步更新状态
    ImagePromise(src).finally(() => {
      // 只在组件未卸载时更新状态
      if (!cancelled) {
        setLoading(false)
        setDone(true)
      }
    })

    // 清理函数：组件卸载时标记为已取消
    return () => {
      cancelled = true
    }
  }, [src])

  return {
    loading,
    done
  }
}

export default useImage
