/*
 * @Author: Carlos
 * @Date: 2022-12-28 14:08:00
 * @LastEditTime: 2022-12-28 14:39:04
 * @FilePath: /vite-react-swc/src/pages/home/index.tsx
 * @Description: 
 */
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <div>
        <ul>
          <li>
            <Link to="/todos">TODOs</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home