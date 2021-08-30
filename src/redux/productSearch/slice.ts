/* 
  1. 引入 createSlice
*/
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* 
  2. 定义state接口类型
*/
interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any; // 分页
}

/* 
  3. 定义初始化state
*/
const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null,
};

export const searchProduct = createAsyncThunk(
    'productSearch/searchProduct', // 格式：命名空间/action
    async (paramaters: {
        keywords: string;
        nextPage: number | string;
        pageSize: number | string;
    }) => {
        let url = `/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
        if (paramaters.keywords) url += `&keyword=${paramaters.keywords}`;
        const response = await axios.get(url);
        console.log('response', response);
        return {
            data: response.data,
            pagination: JSON.parse(response.headers['x-pagination']),
        };
    } // 传入一个返回Promise的回调函数
);

/* 
  createSlice({}) 将actionCreator 和 reducer 进行了合并
*/
export const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
            state.data = null;
        },
    },
});
