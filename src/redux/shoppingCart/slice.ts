/* 
  1. 引入 createSlice
*/
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* 
  2. 定义state接口类型
*/
interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

/* 
  3. 定义初始化state
*/
const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    items: [],
};

/* 
  获取购物车列表
*/
export const getShoppingCart = createAsyncThunk(
    'shoppingCart/getShoppingCart', // 命名空间
    async (jwt: string) => {
        const { data } = await axios.get(`/api/shoppingCart`, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
        return data.shoppingCartItems;
    } // 传入一个返回Promise的回调函数
);

/* 
    添加购物车
*/
export const addShoppingCartItem = createAsyncThunk(
    'shoppingCart/addShoppingCartItem', // 命名空间
    async (parameters: { jwt: string; touristRouteId: string }) => {
        const { data } = await axios.post(
            `/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
        return data.shoppingCartItems;
    } // 传入一个返回Promise的回调函数
);

/* 
    结算购物车
*/
export const checkOut = createAsyncThunk(
    'shoppingCart/checkOut', // 命名空间
    async (jwt: string) => {
        const { data } = await axios.post(`/api/shoppingCart/checkout`, null, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
        return data;
    } // 传入一个返回Promise的回调函数
);

/* 
    清空购物车
*/
export const clearShoppingCart = createAsyncThunk(
    'shoppingCart/clearShoppingCart', // 命名空间
    async (parameters: { jwt: string; itemsId: number[] }) => {
        const respons = await axios.delete(
            `/api/shoppingCart/items/(${parameters.itemsId.join(',')})}`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
        return respons.data;
    } // 传入一个返回Promise的回调函数
);

/* 
  createSlice({}) 将actionCreator 和 reducer 进行了合并
*/
export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    /* 
      1. action 和 reducer进行了【捆绑】，不需要单独定义action
        - 在捆绑 action 和 reducer的时候会根据reducer的【函数签名】自动生成相应的actionCreator
      2. 这里的reducer是一个对象，而不是过程，每个对象对应一个action，同时对应着这个action的处理函数
      3. reducers本身是面对对象，而不是面向过程的，不需要再写switch语句
    */
    reducers: {},
    extraReducers: {
        // 获取购物车列表
        [getShoppingCart.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 添加购物车
        [addShoppingCartItem.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 清除购物车
        [clearShoppingCart.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [clearShoppingCart.fulfilled.type]: state => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [clearShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 结算
        [checkOut.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [checkOut.fulfilled.type]: (state, action) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
