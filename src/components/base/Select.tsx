/*
 * @Author: Carlos
 * @Date: 2023-01-15 22:51:45
 * @LastEditTime: 2023-01-16 00:47:56
 * @FilePath: /vite-react-swc/src/components/base/Select.tsx
 * @Description:
 */
import { useClickAway, useSize, useToggle } from 'ahooks'
import clsx from 'clsx'
import { HTMLAttributes, useLayoutEffect, useMemo, useRef, useState } from 'react'

type Option = {
  value: React.Key
  label: React.ReactNode
}

type Props = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value: React.Key | undefined
  options: Option[]
  onChange: (key: Option['value'], o: Option) => void
}
const Select = (props: Props) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const selectRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [visible, { setLeft, setRight }] = useToggle(false)
  const [width, setWidth] = useState(0)
  const spanSize = useSize(spanRef)
  useClickAway(() => {
    setLeft()
  }, spanRef)

  useLayoutEffect(() => {
    setWidth(spanSize?.width || 0)
  }, [spanSize])

  const { options, onChange, className = '', value = '' } = props
  const classNames = useMemo(
    () => className.split(' ').filter(e => !!e.replace(/\s+/g, '')),
    [className]
  )
  const inputClassName = useMemo(() => classNames.filter(c => c.startsWith('select-')), [className])
  const spanClassName = useMemo(() => classNames.filter(c => !c.startsWith('select-')), [className])
  const menuClassName = useMemo(
    () => inputClassName.map(c => !c.replace('select', 'menu')),
    [inputClassName]
  )
  const mergedValue = useMemo(() => {
    return options.filter(o => o.value === value).map(o => String(o.label))
  }, [value, options])
  const handleClick = (o: Option) => {
    onChange(o.value, o)
    setLeft()
    selectRef.current?.focus()
  }
  return (
    <span ref={spanRef} className={clsx('inline-block relative', ...spanClassName)}>
      <input
        ref={selectRef}
        type="search"
        className={clsx('select w-full', ...inputClassName)}
        onClick={setRight}
        readOnly
        value={mergedValue}
      />
      <ul
        ref={menuRef}
        className={clsx(
          'menu rounded-box bg-base-100 p-2 absolute -bottom-2 overflow-auto flex-nowrap',
          ...menuClassName,
          {
            hidden: !visible,
            'translate-y-full': visible
          }
        )}
        style={{ width, maxHeight: 200 }}
      >
        {options.map(o => (
          <li key={o.value} onClick={() => handleClick(o)}>
            <span
              className={clsx({
                active: o.value === value
              })}
            >
              {o.label}
            </span>
          </li>
        ))}
      </ul>
    </span>
  )
}
export default Select
