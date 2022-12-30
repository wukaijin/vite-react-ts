/*
 * @Author: Carlos
 * @Date: 2022-12-30 23:08:47
 * @LastEditTime: 2022-12-31 01:33:01
 * @FilePath: /vite-react-swc/src/components/enhance/Modal.tsx
 * @Description:
 */
import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement> & {
  dataTheme?: string
  show: boolean
  onClickBackdrop?: () => void
}>

const MODAL_DOM: Element = document.querySelector('#modal')!

const Modal = (props: Props) => {
  const { show, children, onClickBackdrop, dataTheme, className, ...res } = props
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
      if (show === true) {
        MODAL_DOM.appendChild(el.current!)
      } else {
        setTimeout(() => {
          if (el.current && MODAL_DOM.contains(el.current)) {
            MODAL_DOM.removeChild(el.current)
          }
        }, 100)
      }
    }
  }, [show])
  if (!el.current) return null
  
  const containerClasses = clsx('modal', {
    'modal-open': show,
  })
  return createPortal(
    <>
      <div
        aria-label="Modal"
        aria-hidden={!open}
        data-theme={dataTheme}
        className={containerClasses}
        onClick={(e) => {
          e.stopPropagation()
          if (e.target === e.currentTarget) {
            e.stopPropagation()
            if (onClickBackdrop) {
              onClickBackdrop()
            }
          }
        }}
      >
        <div
          {...res}
          data-theme={dataTheme}
          className={twMerge("modal-box", className)}
          // ref={ref}
        >
          {children}
        </div>
      </div>
    </>,
    el.current
  )
}

export default Modal
