/*
 * @Author: Carlos
 * @Date: 2022-12-27 16:40:48
 * @LastEditTime: 2022-12-29 22:39:09
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
import Button from '@/components/base/Button'
import Loading from '@/components/base/Loading'
import Checkbox from '@/components/base/Checkbox'

const Todos: React.FC<PropsFromRedux> = props => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.todos}>
      
      <div className={styles.title}>
        <span>Todos</span>
        <span>
          <Button
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
          </Button>
          <Button onClick={() => dispatch(asyncFetchData())}>MOCK</Button>
        </span>
      </div>
      <div>
      <Loading.Circle size={90}/>
      <Loading.Dot />
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
            <Checkbox 
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
            <Button onClick={() => props.todoRemoved(index)}>Remove</Button>
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
