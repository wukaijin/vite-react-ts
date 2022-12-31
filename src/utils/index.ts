/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:05:11
 * @LastEditTime: 2022-12-28 14:45:50
 * @FilePath: /vite-react-swc/src/utils/index.ts
 * @Description:
 */
export const getUniqueId: () => string = () => {
  return Math.random().toString(36).substring(2, 10)
}
