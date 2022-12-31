/*
 * @Author: Carlos
 * @Date: 2022-12-30 11:24:57
 * @LastEditTime: 2022-12-30 11:36:56
 * @FilePath: /vite-react-swc/src/pages/Wait.tsx
 * @Description:
 */
import Loading from '@/components/base/Loading'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Wait = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    }, 4000)
  }, [])
  return (
    <div className="bg-g-purple w-screen h-screen flex justify-center items-center">
      <Loading.Dot />
    </div>
  )
}
export default Wait
