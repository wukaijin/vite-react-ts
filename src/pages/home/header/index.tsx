/*
 * @Author: Carlos
 * @Date: 2022-12-30 14:36:19
 * @LastEditTime: 2023-01-01 14:55:56
 * @FilePath: /vite-react-swc/src/pages/home/header/index.tsx
 * @Description:
 */
import { Header } from '@/components/base/layout'
import logo from '@/assets/logo.png'

type Props = unknown
const HomeHeader: React.FC<Props> = () => (
  <Header className="h-14 leading-14 box-border border-slate-900/10">
    <div className="flex px-6">
      <div className="flex items-center justify-center">
        <img width={36} height={36} src={logo} alt="" />
      </div>
    </div>
  </Header>
)
export default HomeHeader
