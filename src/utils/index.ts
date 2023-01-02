/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:05:11
 * @LastEditTime: 2023-01-02 22:07:26
 * @FilePath: /vite-react-swc/src/utils/index.ts
 * @Description:
 */
export const getUniqueId: () => string = () => Math.random().toString(36).substring(2, 10)
export default {}
