/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2022-12-28 17:04:49
 * @FilePath: /vite-react-swc/src/pages/todos/index.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
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
          <button className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md" onClick={() => dispatch(asyncFetchData())}>MOCK</button>
        </span>
      </div>
      <div className={styles.content}>
        {props.todos.map((todo, index) => (
          <div className={styles.todoItem} key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e => {
                props.todoToggled(todo.id)
              }}
            />
            <span className='bg-gray-400'>{todo.text}</span>
            <button onClick={() => props.todoRemoved(index)}>Remove</button>
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
