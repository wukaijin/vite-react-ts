/*
 * @Author: Carlos
 * @Date: 2022-12-30 17:28:56
 * @LastEditTime: 2023-01-02 22:27:50
 * @FilePath: /vite-react-swc/src/hooks/useModal.tsx
 * @Description:
 */
import { useCallback, useState } from 'react'
import Modal from '@/components/enhance/Modal'

const useModal = () => {
  const [show, setShow] = useState<boolean>(false)
  const open = useCallback(() => setShow(true), [])
  const close = useCallback(() => setShow(false), [])

  return {
    show,
    open,
    close,
    Modal
  }
}
export default useModal
