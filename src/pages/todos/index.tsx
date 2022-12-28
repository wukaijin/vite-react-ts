/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2022-12-28 22:23:41
 * @FilePath: /vite-react-swc/src/pages/todos/index.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
import clx from 'classnames'
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
const a = () => (
  <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div className="shrink-0">
      <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
    </div>
    <div>
      <div className="text-xl font-medium text-black">ChitChat</div>
      <p className="text-slate-500">You have a new message!</p>
    </div>
  </div>
)
const Todos: React.FC<PropsFromRedux> = props => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.todos}>
      <div className={styles.title}>
        <span>Todos</span>
        <span>
          <button
            className={styles.gapRight}
            onClick={() => {
              var name = prompt('请输入TODO：')
              props.todoAdded({
                id: getUniqueId(),
                text: name || '',
                completed: true
              })
            }}
          >
            Add
          </button>
          <button onClick={() => dispatch(asyncFetchData())}>MOCK</button>
        </span>
      </div>
      <div className={clx(styles.content)}>
        {props.todos.map((todo, index) => (
          <div
            className={clx(
              styles.todoItem,
              'p-6 max-w-[500px] mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-2 hover:bg-blue-50'
            )}
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e => {
                props.todoToggled(todo.id)
              }}
            />
            <blockquote>
              <span
                className={clx(
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
            <button
              className="px-2 py-1 shrink-0 bg-sky-500 hover:bg-sky-700 text-white focus:outline-none focus:ring focus:ring-sky-300 rounded-md"
              onClick={() => props.todoRemoved(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div></div>
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
