/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2023-01-01 02:37:35
 * @FilePath: /vite-react-swc/src/pages/todos/index.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { connect } from 'react-redux'
import { PlusIcon } from '@heroicons/react/24/outline'
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
import { useState } from 'react'
import AddActionModel from './AddActionModel'
import TodoCard from './TodoCard'
import FilterTabs from './FilterTabs'

export const STATE_MAPPING = ['All', 'Done', 'Pending'] as const

const Todos: React.FC<PropsFromRedux> = props => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [active, setActive] = useState<typeof STATE_MAPPING[number]>('All')
  return (
    <div
      className={clsx(
        styles.todos,
        'px-6 py-4 sm:pt-12  bg-g-blue bg-gradient-to-tr min-h-screen'
      )}
    >
      <div className={styles.title}>
        <div className="text-4xl font-bold text-white">Todo List</div>
        <div className="flex items-center">
          {/* <button className='btn-info'>ss</button> */}

          <Button
            shape="circle"
            className="glass mr-3"
            onClick={() => {
              setShow(true)
            }}
          >
            <PlusIcon className="w-6 h-6" />
          </Button>
          <Button
            className="glass font-normal"
            onClick={() => dispatch(asyncFetchData())}
          >
            MOCK
          </Button>
        </div>
      </div>
      <div className={clsx(styles.content)}>
        {/* <div className="sticky flex text-center justify-center">
          <div className="btn-group btn-group-horizontal">
            <button className="btn btn-active">All</button>
            <button className="btn">Done</button>
            <button className="btn">Pending</button>
          </div>
        </div> */}
        
        <FilterTabs active={active} onChange={setActive} />
        <div>
          {props.todos.map((todo, index) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onRemove={() => {
                console.log('Removed  ')
                props.todoRemoved(index)
              }}
              onChange={() => props.todoToggled(todo.id)}
            />
          ))}
        </div>
      </div>
      <AddActionModel
        show={show}
        onClose={() => setShow(false)}
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
