/*
 * @Author: Carlos
 * @Date: 2022-12-29 21:21:40
 * @LastEditTime: 2022-12-29 22:23:47
 * @FilePath: /vite-react-swc/src/components/base/Loading.tsx
 * @Description:
 */

/*
.spinner {
  background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
  width: 100px;
  height: 100px;
  animation: spinning82341 1.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
}

.spinner1 {
  background-color: rgb(36, 36, 36);
  width: 100px;
  height: 100px;
  border-radius: 50px;
  filter: blur(10px);
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}
*/
import styles from './loading.module.scss'
interface IProps {
  size?: number
  height?: number
}
const Circle: React.FC<IProps> = ({ size = 100 }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`
  }
  // const sizeTo = `w-[100px] h-[100px]`
  return (
    <div
      className="inline-block animate-spin text-center rounded-full blur-[1px]"
      style={{
        boxShadow:
          '0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255)',
        backgroundImage:
          'linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255))',
        ...style
      }}
    >
      <div
        style={style}
        className="bg-gray-800 bg-opacity-90 rounded-full blur-[10px]"
      ></div>
    </div>
  )
}

const Dot = () => (
  <div className={styles.wrapper}>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
  </div>
)

export default {
  Circle,
  Dot
}
