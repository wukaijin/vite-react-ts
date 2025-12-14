/*
 * @Author: Carlos
 * @Date: 2022-12-30 23:08:47
 * @LastEditTime: 2023-01-18 00:31:56
 * @FilePath: /vite-react-ts/src/components/base/Modal.tsx
 * @Description:
 */
import { useLayoutEffect, useState } from 'react'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

type Props = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    dataTheme?: string
    visible: boolean
    onClickBackdrop?: () => void
  }
>

const MODAL_DOM: Element = document.querySelector('#modal')!

function Modal(props: Props) {
  const { visible, children, onClickBackdrop, dataTheme, className, ...res } = props
  const [actVisible, setActVisibility] = useState(false)
  const [prevVisible, setPrevVisible] = useState(visible)

  // 使用 useState 的惰性初始化：初始化函数只在首次渲染时执行一次
  const [containerEl] = useState(() => document.createElement('div'))

  // 在渲染期间检测 visible 变化并同步状态（React 推荐模式）
  if (visible !== prevVisible) {
    setActVisibility(visible)
    setPrevVisible(visible)
  }

  // 清理函数：组件卸载时移除容器
  useLayoutEffect(() => {
    return () => {
      if (MODAL_DOM.contains(containerEl)) {
        MODAL_DOM.removeChild(containerEl)
      }
    }
  }, [containerEl])

  useLayoutEffect(() => {
    // Effect 只负责 DOM 操作
    if (visible === true) {
      MODAL_DOM.appendChild(containerEl)
    } else {
      setTimeout(() => {
        if (containerEl && MODAL_DOM.contains(containerEl)) {
          MODAL_DOM.removeChild(containerEl)
        }
      }, 500)
    }
  }, [visible, containerEl])

  const containerClasses = clsx('modal', {
    'modal-open': actVisible
  })
  return createPortal(
    <div
      aria-label="Modal"
      aria-hidden={!visible}
      data-theme={dataTheme}
      className={containerClasses}
      onClick={e => {
        e.stopPropagation()
        if (e.target === e.currentTarget) {
          e.stopPropagation()
          if (onClickBackdrop) {
            onClickBackdrop()
          }
        }
      }}
    >
      <div {...res} data-theme={dataTheme} className={twMerge('modal-box', className)}>
        {children}
      </div>
    </div>,
    containerEl
  )
}

export default Modal
