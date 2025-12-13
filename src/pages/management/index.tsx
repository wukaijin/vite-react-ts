/*
 * @Author: Carlos
 * @Date: 2023-01-14 15:30:27
 * @LastEditTime: 2023-01-15 15:35:21
 * @FilePath: /vite-react-swc/src/pages/management/index.tsx
 * @Description:
 */

import { useToggle } from 'ahooks'
import { Outlet } from 'react-router-dom'
import Sider from './Sider'

const Management = () => {
  const [siderVisible, { toggle }] = useToggle(true)
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="navbar bg-base-100 border-b sticky top-0 z-10">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <button className="btn btn-ghost normal-case text-xl">Management</button>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex">
        <Sider visible={siderVisible} />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Management
