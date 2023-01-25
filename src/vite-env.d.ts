/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2023-01-25 14:39:55
 * @FilePath: /vite-react-swc/src/vite-env.d.ts
 * @Description: 
 */
/// <reference types="vite/client" />
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}
