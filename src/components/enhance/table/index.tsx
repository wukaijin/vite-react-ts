/*
 * @Author: Carlos
 * @Date: 2023-01-03 22:54:22
 * @LastEditTime: 2023-01-03 23:43:56
 * @FilePath: /vite-react-swc/src/components/enhance/table/index.tsx
 * @Description:
 */
import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import TableRow from './TableRow'
import { type IComponentBaseProps } from '@/declare'

export type TableBodyProps = React.TableHTMLAttributes<HTMLTableSectionElement>

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <tbody {...props} ref={ref}>
        {children}
      </tbody>
    )
  }
)
export type TableFooterProps = React.TableHTMLAttributes<HTMLTableSectionElement> &
  IComponentBaseProps & {
    children?: ReactNode[]
  }

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <tfoot {...props} ref={ref}>
        <tr>
          {children?.map((child, i) => {
            return <th key={i}>{child}</th>
          })}
        </tr>
      </tfoot>
    )
  }
)

export type TableHeadProps = React.TableHTMLAttributes<HTMLTableSectionElement> & {
  children?: React.ReactNode[]
}
const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, ...props }, ref) => {
    return (
      <thead {...props} ref={ref}>
        <tr>
          {children?.map((child, i) => {
            return <th key={i}>{child}</th>
          })}
        </tr>
      </thead>
    )
  }
)

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> &
  IComponentBaseProps & {
    compact?: boolean
    zebra?: boolean
  }

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, compact, zebra, dataTheme, className, ...props }, ref): JSX.Element => {
    const classes = twMerge(
      'table',
      className,
      clsx({
        'table-zebra': zebra,
        'table-compact': compact
      })
    )

    return (
      <table {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {children}
      </table>
    )
  }
)
export default Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Footer: TableFooter
})
