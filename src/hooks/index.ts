/*
 * @Author: Carlos
 * @Date: 2022-12-27 17:25:30
 * @LastEditTime: 2022-12-28 11:07:57
 * @FilePath: /vite-react-swc/src/hooks/index.ts
 * @Description: 
 */
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector