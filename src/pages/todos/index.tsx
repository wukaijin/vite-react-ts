/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2023-01-14 21:39:06
 * @FilePath: /vite-react-swc/src/pages/todos/index.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { createRef, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo } from '@/store/todos'
import styles from './todos.module.scss'
import { getUniqueId } from '@/utils'
import Button from '@/components/base/Button'
import AddActionModel from './AddActionModel'
import TodoCard from './TodoCard'
import FilterTabs from './FilterTabs'

async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  return response.json().then(data =>
    data.slice(1, 100).map((t: any) => ({
      id: t.id.toString(),
      text: t.title,
      completed: t.completed,
      ref: createRef<HTMLDivElement>()
    }))
  )
}
export const STATE_MAPPING = ['All', 'Pending', 'Done'] as const

const Todos: React.FC<{}> = props => {
  const navigate = useNavigate()
  const [visible, setVisibility] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [active, setActive] = useState<typeof STATE_MAPPING[number]>('All')
  const filteredTodos = useMemo(
    () =>
      todos.filter(todo => {
        if (active === 'All') return true
        if (active === 'Done') {
          return todo.completed
        }
        if (active === 'Pending') {
          return !todo.completed
        }
        return true
      }),
    [active, todos]
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
              setVisibility(true)
            }}
          >
            <PlusIcon className="w-6 h-6 text-white" />
          </Button>
          <Button
            size="sm"
            className="glass font-normal  text-white"
            onClick={() => {
              fetchTodos().then(e => setTodos(e))
            }}
          >
            MOCK
          </Button>
        </div>
      </div>
      <div className={clsx(styles.content)}>
        <FilterTabs active={active} onChange={setActive} />
        <div className="transition-all">
          <TransitionGroup>
            {filteredTodos.map((todo, index) => (
              <CSSTransition
                key={todo.id}
                timeout={1000}
                du
                nodeRef={todo.ref}
                classNames={{
                  // appear: 'opacity-0',
                  // appearActive: 'opacity-100 transition-opacity duration-1000',
                  // appearDone: 'opacity-100',
                  enter: styles.enter, // 'opacity-0',
                  enterActive: styles.enterActive,
                  // 'opacity-100 transition-opacity duration-1000',
                  // enterDone: 'opacity-100',
                  exit: styles.exit, //  'opacity-100',
                  exitActive: styles.exitActive
                  // 'opacity-0 transition-opacity duration-1000',
                  // exitDone: 'opacity-0'
                }}
              >
                <TodoCard
                  ref={r => (todo.ref.current = r)}
                  key={todo.id}
                  todo={todo}
                  onRemove={() => {
                    setTodos((ts) => {
                      return ts.filter(e => {
                        if (e.id === todo.id) {
                          return false
                        }
                        return true
                      })
                    })
                  }}
                  onChange={() => {
                    setTodos((ts) => {
                      return ts.map(e => {
                        if (e.id === todo.id) {
                          return { ...e, completed: !todo.completed }
                        }
                        return e
                      })
                    })
                  }}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      <AddActionModel
        visible={visible}
        onClose={() => setVisibility(false)}
        onConfirm={(text: string) => {
          setVisibility(false)
          setTodos(ts => ([{
            id: getUniqueId(),
            text: text || '',
            completed: false,
            ref: createRef()
          }, ...ts]))
        }}
      />
    </div>
  )
}

export default Todos
