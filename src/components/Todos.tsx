/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2022-12-28 01:02:10
 * @FilePath: /vite-react-swc/src/components/Todos.tsx
 * @Description:
 * @reference: https://react-redux.js.org/using-react-redux/usage-with-typescript
 */
import { connect } from 'react-redux'
import type { ConnectedProps } from 'react-redux'
import { todoToggled, todoAdded, todoRemoved } from '@/store/todos'
import type { RootState } from '@/store'
import styles from './todos.module.scss'

const getRandomId: () => string = () => {
  return Math.random().toString(36).substring(2, 10)
}
const Todos: React.FC<PropsFromRedux> = props => {
  return (
    <div className={styles.todos}>
      <div className={styles.title}>
        <span>Todos</span>
        <button
          onClick={() => {
            var name = prompt('请输入TODO：')
            props.todoAdded({
              id: getRandomId(),
              text: name || '',
              completed: true
            })
          }}
        >
          Add
        </button>
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
            <span>{todo.text}</span>
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
