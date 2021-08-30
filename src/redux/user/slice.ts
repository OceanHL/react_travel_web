/* 
  1. 引入 createSlice
*/
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* 
  2. 定义state接口类型
*/
interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null; // 保存JWT
}

/* 
  3. 定义初始化state
*/
const initialState: UserState = {
    loading: false,
    error: null,
    token: null,
};
/* 
  4. 定义异步Thunk
*/
export const signIn = createAsyncThunk(
    'user/signIn', // 命名空间
    async (paramaters: { email: string; password: string }) => {
        const { data } = await axios.post<{ token: string }>(`/api/auth/login`, {
            email: paramaters.email,
            password: paramaters.password,
        });
        return data.token;
    } // 传入一个返回Promise的回调函数
);

/* 
  createSlice({}) 将actionCreator 和 reducer 进行了合并
*/
export const userSlice = createSlice({
    name: 'user',
    initialState,
    /* 
      1. action 和 reducer进行了【捆绑】，不需要单独定义action
        - 在捆绑 action 和 reducer的时候会根据reducer的【函数签名】自动生成相应的actionCreator
      2. 这里的reducer是一个对象，而不是过程，每个对象对应一个action，同时对应着这个action的处理函数
      3. reducers本身是面对对象，而不是面向过程的，不需要再写switch语句
    */
    reducers: {
        // 注销登陆
        logOut: state => {
            state.loading = false;
            state.error = null;
            state.token = null; // 清空token
        },
    },
    extraReducers: {
        [signIn.pending.type]: state => {
            // return {...state, loading: true}
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
            state.token = null;
        },
    },
});
