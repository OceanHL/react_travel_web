/* 
  1. 引入 createSlice
*/
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* 
  2. 定义state接口类型
*/
interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

/* 
  3. 定义初始化state
*/
const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null,
};

export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail', // 命名空间
    async (touristRouteId: string) => {
        const { data } = await axios.get(`/api/touristRoutes/${touristRouteId}`);
        return data;
    } // 传入一个返回Promise的回调函数
);

/* 
  createSlice({}) 将actionCreator 和 reducer 进行了合并
*/
export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    /* 
      1. action 和 reducer进行了【捆绑】，不需要单独定义action
        - 在捆绑 action 和 reducer的时候会根据reducer的【函数签名】自动生成相应的actionCreator
      2. 这里的reducer是一个对象，而不是过程，每个对象对应一个action，同时对应着这个action的处理函数
      3. reducers本身是面对对象，而不是面向过程的，不需要再写switch语句
    */
    reducers: {},
    extraReducers: {
        [getProductDetail.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
            state.data = null;
        },
    },
});
