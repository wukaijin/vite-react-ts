/*
 * @Author: Carlos
 * @Date: 2023-01-21 01:09:45
 * @LastEditTime: 2023-01-22 23:32:07
 * @FilePath: /vite-react-ts/src/pages/blog/article/Directory.tsx
 * @Description:
 */
import clsx from 'clsx'
import { useMemo } from 'react'
import generateDirectory from '@/utils/generateDirectory'

type Props = {
  visible?: boolean
  setVisibility: (v: boolean) => void
  content?: string
}

function Directory(props: Props) {
  const { visible = false, content, setVisibility } = props
  const scroll = (text: string, level = 1) => {
    const target = [
      ...document.querySelector('.markdown-body')!.querySelectorAll(`h${level}`)
    ].find(ele => ele.textContent === text)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setVisibility(false)
  }
  const directory = useMemo(() => {
    if (!content) return []
    return generateDirectory(content)
  }, [content])
  return (
    <ul
      className={clsx(
        'absolute top-12 left-0 border rounded-xl bg-white/95 text-gray-600 p-4 text-left',
        {
          hidden: !visible
        }
      )}
    >
      {directory.map(d => {
        return (
          <li key={d.index} className="text-lg">
            <div>
              <span className="cursor-pointer hover:text-sky-500" onClick={() => scroll(d.title)}>
                {d.title}
              </span>
            </div>
            {d.children &&
              d.children.length &&
              d.children.map(sec => (
                <div key={sec.index} className="pl-4 text-base">
                  <span
                    className="cursor-pointer hover:text-sky-500"
                    onClick={() => scroll(d.title, 2)}
                  >
                    {sec.title}
                  </span>
                </div>
              ))}
          </li>
        )
      })}
    </ul>
  )
}
export default Directory
