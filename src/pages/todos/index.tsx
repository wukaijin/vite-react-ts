/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2023-01-02 22:23:47
 * @FilePath: /vite-react-swc/src/pages/todos/index.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { connect } from 'react-redux'
import { PlusIcon } from '@heroicons/react/24/outline'
import type { ConnectedProps } from 'react-redux'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todoToggled, todoAdded, todoRemoved, asyncFetchData } from '@/store/todos'
import type { RootState } from '@/store'
import styles from './todos.module.scss'
import { getUniqueId } from '@/utils'
import { useAppDispatch } from '@/hooks'
import Button from '@/components/base/Button'
import AddActionModel from './AddActionModel'
import TodoCard from './TodoCard'
import FilterTabs from './FilterTabs'

export const STATE_MAPPING = ['All', 'Pending', 'Done'] as const

const Todos: React.FC<PropsFromRedux> = props => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [active, setActive] = useState<typeof STATE_MAPPING[number]>('All')
  const filteredTodos = useMemo(
    () =>
      props.todos.filter(todo => {
        if (active === 'All') return true
        if (active === 'Done') {
          return todo.completed
        }
        if (active === 'Pending') {
          return !todo.completed
        }
        return true
      }),
    [active, props.todos]
  )
  return (
    <div className={clsx(styles.todos, 'bg-g-blue bg-gradient-to-tr min-h-screen')}>
      <div className={styles.title}>
        <div className="text-4xl font-bold text-white ">
          <span onClick={() => navigate('/')} onKeyUp={() => navigate('/')}>
            <span className="text-amber-400">To</span>
            <span className="text-teal-100 relative animate-pulse before:bg-pink-500/70 before:block before:absolute before:-inset-1 before:-skew-y-3">
              <span className="relative">Do</span>
            </span>
            <span className="text-amber-400 ml-1">List</span>
          </span>
        </div>
        <div className="flex items-center">
          <Button
            shape="circle"
            size="sm"
            className="glass mr-3"
            onClick={() => {
              setShow(true)
            }}
          >
            <PlusIcon className="w-6 h-6" />
          </Button>
          <Button
            size="sm"
            className="glass font-normal"
            onClick={() => dispatch(asyncFetchData())}
          >
            MOCK
          </Button>
        </div>
      </div>
      <div className={clsx(styles.content)}>
        <FilterTabs active={active} onChange={setActive} />
        <div>
          {filteredTodos.map((todo, index) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onRemove={() => {
                props.todoRemoved(todo)
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
      />
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
