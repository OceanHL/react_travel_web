/*
 * @Author: jhl
 * @Date: 2021-08-24 10:47:42
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-24 10:52:35
 * @Description:
 */
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';

// # 绑定state的类型
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
