/*
 * @Author: jhl
 * @Date: 2021-08-21 14:43:05
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-28 16:48:23
 * @Description:
 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import actionLog from './middlewares/actionLog';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice } from './productSearch/slice';
import { userSlice } from './user/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { orderSlice } from './order/slice';
/* 
  合并reducer，合并所有的state数据结构
*/
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer,
});

// 传入Reducer会自动绑定数据state的类型定义
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), actionLog],
    devTools: true, // 开启redux开发工具插件
});

// 获取 state 的类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
