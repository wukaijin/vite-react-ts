/*
 * @Author: Carlos
 * @Date: 2023-01-03 22:59:23
 * @LastEditTime: 2023-01-03 23:04:47
 * @FilePath: /vite-react-swc/src/components/enhance/table/TableRow.tsx
 * @Description:
 */
import React, { ReactElement } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { IComponentBaseProps } from '@/declare'

export type TableRowProps = React.TableHTMLAttributes<HTMLTableRowElement> &
  IComponentBaseProps & {
    children?: ReactElement[]
    active?: boolean
    hover?: boolean
  }

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, active, hover, className, ...props }, ref): JSX.Element => {
    const classes = twMerge(
      className,
      clsx({
        active,
        hover
      })
    )

    return (
      <tr {...props} className={classes} ref={ref}>
        {children?.map((child, i) => {
          return i < 1 ? <th key={i}>{child}</th> : <td key={i}>{child}</td>
        })}
      </tr>
    )
  }
)

export default TableRow
