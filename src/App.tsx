/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2023-01-02 22:35:01
 * @FilePath: /vite-react-swc/src/App.tsx
 * @Description:
 */
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import store from './store'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
