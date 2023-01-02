/*
 * @Author: Carlos
 * @Date: 2022-12-30 14:41:24
 * @LastEditTime: 2023-01-01 15:34:22
 * @FilePath: /vite-react-swc/src/pages/home/content/index.tsx
 * @Description:
 */
import { Content } from '@/components/base/layout'
import Panel from '@/components/base/panel'
import { HOME_HEADER_HEIGHT, HOME_FOOTER_HEIGHT } from '@/const'
import { Link } from 'react-router-dom'

type Props = unknown
const NavigateList = () => (
  <ul className="py-8 px-6 bg-[#F4F6FB] bg-opacity-30 rounded-[12px] marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-800">
    <li>
      <Link to="/todos">TODOs</Link>
    </li>
    <li>
      <Link to="/introduction">Introduction</Link>
    </li>
  </ul>
)

const HomeContent = (props: Props) => {
  return (
    <Content
      style={{
        height: `calc(100vh - ${(
          HOME_HEADER_HEIGHT + HOME_FOOTER_HEIGHT
        ).toString()}px)`
      }}
      className="z-1"
    >
      <div className="flex">
        <div className="pt-[200px] pl-[140px]">
          <Panel>
            <NavigateList />
          </Panel>
        </div>
      </div>
      <div></div>
    </Content>
  )
}
export default HomeContent
