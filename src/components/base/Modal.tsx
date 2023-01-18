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
  const el = useRef<HTMLDivElement>()
  useEffect(() => {
    el.current = document.createElement('div')
    return () => {
      if (el.current && MODAL_DOM.contains(el.current)) {
        MODAL_DOM.removeChild(el.current)
      }
    }
  }, [])
  useEffect(() => {
    if (el.current) {
      if (visible === true) {
        MODAL_DOM.appendChild(el.current!)
      } else {
        setTimeout(() => {
          if (el.current && MODAL_DOM.contains(el.current)) {
            MODAL_DOM.removeChild(el.current)
          }
        }, 500)
      }
    }
    setActVisibility(visible)
  }, [visible])
  if (!el.current) return null

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
        // if (onClickBackdrop) {
        //   onClickBackdrop()
        // }
      }}
    >
      <div {...res} data-theme={dataTheme} className={twMerge('modal-box', className)}>
        {children}
      </div>
    </div>,
    el.current
  )
}

export default Modal
