/*
 * @Author: Carlos
 * @Date: 2022-12-30 11:24:57
 * @LastEditTime: 2023-01-12 22:39:18
 * @FilePath: /vite-react-swc/src/pages/Wait.tsx
 * @Description:
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/base/Loading'

function Wait() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/hero')
    }, 4000)
  }, [])
  return (
    <div className="bg-g-purple w-screen h-screen flex justify-center items-center">
      <Loading.Dot />
    </div>
  )
}
export default Wait
