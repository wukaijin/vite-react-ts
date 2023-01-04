/*
 * @Author: Carlos
 * @Date: 2022-12-30 16:21:26
 * @LastEditTime: 2023-01-04 16:04:29
 * @FilePath: /vite-react-swc/src/components/base/panel/index.tsx
 * @Description:
 */

import { CSSProperties, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>
function Panel(props: Props) {
  return (
    <div className="rounded-md shadow-lg order border-cyan-800  border-opacity-10 ">
      {props.children}
    </div>
  )
}
export default Panel
