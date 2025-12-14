/*
 * @Author: Carlos
 * @Date: 2022-12-29 22:28:00
 * @LastEditTime: 2022-12-29 22:38:09
 * @FilePath: /vite-react-ts/src/components/base/Checkbox.tsx
 * @Description:
 */
import { InputHTMLAttributes } from 'react'
import styles from './checkbox.module.scss'

type Props = InputHTMLAttributes<HTMLElement>

function Checkbox(props: Props) {
  return (
    <label className={styles['wk-checkbox']}>
      <input {...props} type="checkbox" />
      <div className={styles.checkmark} />
    </label>
  )
}

export default Checkbox
