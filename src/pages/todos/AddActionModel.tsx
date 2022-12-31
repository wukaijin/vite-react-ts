/*
 * @Author: Carlos
 * @Date: 2022-12-30 23:05:59
 * @LastEditTime: 2022-12-31 01:43:20
 * @FilePath: /vite-react-swc/src/pages/todos/AddActionModel.tsx
 * @Description:
 */
import { FC, useEffect, useState } from 'react'
import Button from '@/components/base/Button'
import Modal from '@/components/enhance/Modal'

type Props = {
  show: boolean
  onConfirm: (text: string) => void
  onClose?: () => void
}

const AddActionModel: FC<Props> = props => {
  const [text, setText] = useState<string>('')
  useEffect(() => {
    setText('')
  }, [props.show])
  return (
    <Modal show={props.show}>
      <div className="text-xl mb-4">Todo</div>
      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered input-primary w-full"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            props.onConfirm(text)
          }}
        >
          Submit
        </Button>
      </div>
    </Modal>
  )
}

export default AddActionModel
