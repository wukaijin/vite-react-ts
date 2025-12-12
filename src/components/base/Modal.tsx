/*
 * @Author: Carlos
 * @Date: 2022-12-30 23:08:47
 * @LastEditTime: 2023-01-18 00:31:56
 * @FilePath: /vite-react-swc/src/components/base/Modal.tsx
 * @Description:
 */
import { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react'
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
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = document.createElement('div')
    setContainerEl(element)
    return () => {
      if (MODAL_DOM.contains(element)) {
        MODAL_DOM.removeChild(element)
      }
    }
  }, [])

  useEffect(() => {
    if (containerEl) {
      if (visible === true) {
        MODAL_DOM.appendChild(containerEl)
      } else {
        setTimeout(() => {
          if (containerEl && MODAL_DOM.contains(containerEl)) {
            MODAL_DOM.removeChild(containerEl)
          }
        }, 500)
      }
    }
    setActVisibility(visible)
  }, [visible, containerEl])

  if (!containerEl) return null

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
