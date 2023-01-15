/*
 * @Author: Carlos
 * @Date: 2022-12-30 17:28:56
 * @LastEditTime: 2023-01-15 00:54:06
 * @FilePath: /vite-react-swc/src/hooks/useModal.tsx
 * @Description:
 */
import React, { useCallback, useState, useMemo } from 'react'
import Modal from '@/components/base/Modal'

interface ConfirmParams {
  title?: React.ReactNode
  content: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}
const noop = () => undefined

const useModal = () => {
  const [visible, setVisibility] = useState<boolean>(false)
  const [title, setTitle] = useState<React.ReactNode>('Confirm')
  const [content, setContent] = useState<React.ReactNode>('')
  const [confirmHandler, setConfirmHandler] = useState<ConfirmParams['onConfirm']>(noop)
  const [cancelHandler, setCancelHandler] = useState<ConfirmParams['onCancel']>(noop)

  const open = useCallback((c: ConfirmParams) => {
    setTitle(c.title || 'Confirm')
    setContent(c.content || '')
    setConfirmHandler(() => c.onConfirm || (() => noop))
    setCancelHandler(() => c.onCancel || (() => noop))
    setVisibility(true)
  }, [])

  const close = useCallback(() => setVisibility(false), [])

  const jsx = useMemo(
    () => (
      <Modal visible={visible}>
        <h3 className="font-bold text-lg">{title}</h3>
        {content}
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={() => {
              cancelHandler!()
              setVisibility(false)
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              confirmHandler!()
              setVisibility(false)
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    ),
    [visible, content, title, confirmHandler, cancelHandler]
  )

  return {
    open,
    close,
    jsx
  }
}
export default useModal
