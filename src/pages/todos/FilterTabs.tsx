/*
 * @Author: Carlos
 * @Date: 2023-01-01 02:18:32
 * @LastEditTime: 2023-01-02 22:24:46
 * @FilePath: /vite-react-swc/src/pages/todos/FilterTabs.tsx
 * @Description:
 */
import clsx from 'clsx'
import { STATE_MAPPING } from '.'

type Props = {
  active: string
  onChange: (str: typeof STATE_MAPPING[number]) => void
}

const baseClassName =
  'transition-colors duration-300 w-full cursor-pointer rounded-lg py-2.5 text-sm font-medium leading-5 ring-white focus:outline-none ring-offset-2 focus:ring-2 ring-opacity-60'
const btnClassName = 'ring-offset-blue-400 text-blue-100 hover:bg-white/[0.12] hover:text-white'
const activePlus = 'text-blue-700 ring-offset-blue-400 bg-white shadow'
function FilterTabs(props: Props) {
  const { active, onChange } = props
  return (
    <div className="sticky pt-2 top-0 z-10">
      <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 max-w-[500px] mx-auto text-center">
        {STATE_MAPPING.map(item => (
          <button
            type="button"
            key={item}
            className={clsx(baseClassName, active === item ? activePlus : btnClassName)}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
export default FilterTabs
