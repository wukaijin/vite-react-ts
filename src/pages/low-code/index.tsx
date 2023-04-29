/*
 * @Author: Carlos
 * @Date: 2023-04-26 16:18:54
 * @LastEditTime: 2023-04-27 09:15:10
 * @FilePath: /vite-react-swc/src/pages/low-code/index.tsx
 * @Description: null
 */
import { Outlet, useLocation } from 'react-router-dom'

type Props = {}
export default function LowCodeLayout({}: Props) {
  const location = useLocation()
  if (location.pathname === '/low-code') return <div>Low-Code Home</div>
  return <Outlet />
}
