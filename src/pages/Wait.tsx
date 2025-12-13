/*
 * @Author: Carlos
 * @Date: 2022-12-30 11:24:57
 * @LastEditTime: 2023-01-25 15:23:26
 * @FilePath: /vite-react-swc/src/pages/Wait.tsx
 * @Description:
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/base/Loading'

function Wait() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/hero')
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])
  return (
    <div className="bg-g-purple w-screen h-screen flex justify-center items-center">
      <Loading.Dot />
    </div>
  )
}
export default Wait
