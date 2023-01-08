/*
 * @Author: Carlos
 * @Date: 2023-01-01 00:54:13
 * @LastEditTime: 2023-01-08 01:26:12
 * @FilePath: /vite-react-swc/src/pages/todos/TodoCard.tsx
 * @Description:
 */
import { forwardRef, RefObject } from 'react'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import styles from './todos.module.scss'
import Button from '@/components/base/Button'
import Checkbox from '@/components/base/Checkbox'
import { Todo } from '@/store/todos'

type Props = {
  todo: Todo
  onChange: () => void
  onRemove: React.MouseEventHandler<HTMLSpanElement>
}

const TodoCard = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { todo, onChange, onRemove } = props
  return (
    <div
      ref={ref}
      className={clsx(
        styles.todoItem,
        'px-6 py-4 max-w-[40rem] mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-2 hover:bg-blue-50'
      )}
      key={todo.id}
    >
      <Checkbox checked={todo.completed} onChange={onChange} />
      <blockquote>
        <span
          className={clsx(
            {
              'text-gray-400': todo.completed
            },
            'text-sm'
          )}
        >
          {todo.text}
        </span>
      </blockquote>
      <Button
        color="error"
        shape="circle"
        size="sm"
        onClick={onRemove}
        className="opacity-80 hover:opacity-100 hover:scale-110"
      >
        <ArchiveBoxXMarkIcon className="h-4 w-4" />
      </Button>
    </div>
  )
})

export default TodoCard
