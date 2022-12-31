/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2022-12-31 13:17:02
 * @FilePath: /vite-react-swc/src/pages/todos/index.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
import clsx from 'clsx'
import {
  todoToggled,
  todoAdded,
  todoRemoved,
  asyncFetchData
} from '@/store/todos'
import type { RootState } from '@/store'
import styles from './todos.module.scss'
import { getUniqueId } from '@/utils'
import { useAppDispatch } from '@/hooks'
import Button from '@/components/base/Button'
import Checkbox from '@/components/base/Checkbox'
import { useState } from 'react'
import AddActionModel from './AddActionModel'

const Todos: React.FC<PropsFromRedux> = props => {
  const dispatch = useAppDispatch()
  //  const { show, close, open } = useModal()
  const [show, setShow] = useState(false)
  return (
    <div className={clsx(styles.todos, 'bg-g-blue min-h-screen')}>
      <div className={styles.title}>
        <span>Todos</span>
        <span>
          <Button
            className={styles.gapRight}
            onClick={() => {
              setShow(true)
            }}
          >
            Add
          </Button>
          <Button onClick={() => dispatch(asyncFetchData())}>MOCK</Button>
        </span>
      </div>
      <div className={clsx(styles.content)}>
        {props.todos.map((todo, index) => (
          <div
            className={clsx(
              styles.todoItem,
              'p-6 max-w-[500px] mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-2 hover:bg-blue-50'
            )}
            key={todo.id}
          >
            <Checkbox
              checked={todo.completed}
              onChange={e => {
                props.todoToggled(todo.id)
              }}
            />
            <blockquote>
              <span
                className={clsx(
                  {
                    'text-gray-400': todo.completed
                  },
                  'cursor-pointer text-sm'
                )}
                onClick={() => props.todoToggled(todo.id)}
              >
                {todo.text}
              </span>
            </blockquote>
            <Button onClick={() => props.todoRemoved(index)}>Remove</Button>
          </div>
        ))}
      </div>
      <AddActionModel
        show={show}
        onConfirm={(text: string) => {
          setShow(false)
          props.todoAdded({
            id: getUniqueId(),
            text: text || '',
            completed: false
          })
        }}
      ></AddActionModel>
    </div>
  )
}

const mapState = (state: RootState) => ({
  todos: state.todos
})
const mapDispatch = {
  todoToggled,
  todoAdded,
  todoRemoved
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
const F = connector(Todos)
export default F
