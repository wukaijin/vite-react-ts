/*
 * @Author: Carlos
 * @Date: 2023-01-16 13:15:12
 * @LastEditTime: 2023-01-16 13:40:00
 * @FilePath: /vite-react-ts/src/components/base/MultiSelect.tsx
 * @Description:
 */
import { Check } from '@icon-park/react'
import { useClickAway, useSize, useToggle } from 'ahooks'
import clsx from 'clsx'
import { type HTMLAttributes, useMemo, useRef } from 'react'

type Option = {
  value: React.Key
  label: React.ReactNode
}

type Props = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value: React.Key[]
  options: Option[]
  onChange: (keys: Option['value'][], options: Option[]) => void
}
const MultiSelect = (props: Props) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const selectRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [visible, { setLeft, setRight }] = useToggle(false)
  const spanSize = useSize(spanRef)
  useClickAway(() => {
    setLeft()
  }, spanRef)

  const { options, onChange, className = '', value = [] } = props
  const classNames = useMemo(
    () => className.split(' ').filter(e => !!e.replace(/\s+/g, '')),
    [className]
  )
  const inputClassName = classNames.filter(c => c.startsWith('select-'))
  const spanClassName = classNames.filter(c => !c.startsWith('select-'))
  const menuClassName = useMemo(
    () => inputClassName.map(c => !c.replace('select', 'menu')),
    [inputClassName]
  )
  const mergedValueObject = useMemo(() => {
    return value.map(v => options.find(o => o.value === v)).filter(e => e)
  }, [value, options]) as Option[]
  const handleClick = (o: Option) => {
    if (mergedValueObject.includes(o)) {
      const updated = mergedValueObject.filter(cur => cur !== o)
      onChange(
        updated.map(u => u!.value),
        updated
      )
    } else {
      const updated = [...mergedValueObject, o]
      onChange(
        updated.map(u => u!.value),
        updated
      )
    }
    // setLeft()
    // selectRef.current?.focus()
  }
  return (
    <span ref={spanRef} className={clsx('inline-block relative', ...spanClassName)}>
      <input
        ref={selectRef}
        type="search"
        className={clsx('select w-full', ...inputClassName)}
        onClick={setRight}
        readOnly
        value={mergedValueObject.map(o => String(o!.label))}
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
        style={{ width: spanSize?.width || 0, maxHeight: 200 }}
      >
        {options.map(o => (
          <li key={o.value} onClick={() => handleClick(o)}>
            <span className="flex items-center justify-between">
              <span>{o.label}</span>
              {value.includes(o.value) && <Check className="text-primary" />}
            </span>
          </li>
        ))}
      </ul>
    </span>
  )
}
export default MultiSelect
