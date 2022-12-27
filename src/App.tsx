/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2022-12-27 23:18:32
 * @FilePath: /vite-react-swc/src/App.tsx
 * @Description: 
 */
import { Provider } from 'react-redux'
import Todos from './components/Todos'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div>
        <Todos />
      </div>
    </Provider>
  )
}

export default App
