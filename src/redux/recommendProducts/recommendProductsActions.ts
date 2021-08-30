import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RootState } from '../store';
/* 
  1. 定义 type 的指令类型
*/
export const FETCH_RECOMMEND_PRODUCTS_START = 'fetch_recommend_products_start'; // 正在调用推荐信息api

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'fetch_recommend_products_success'; // 推荐信息api调用成功

export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'fetch_recommend_products_fail'; // 推荐信息api调用失败

/* 
  2. 定义action对象的接口类型
*/
interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any;
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any;
}

/* 
  3. 混合所有的action，方便在reducer中使用
*/
export type RecommentProductAction =
    | FetchRecommendProductStartAction
    | FetchRecommendProductSuccessAction
    | FetchRecommendProductFailAction;

/* 
  4. 完成action的创建工厂
*/
export const fetchRecommendProductStartAction = (): FetchRecommendProductStartAction => {
    return { type: FETCH_RECOMMEND_PRODUCTS_START };
};
export const fetchRecommendProductSuccessAction = (data): FetchRecommendProductSuccessAction => {
    return { type: FETCH_RECOMMEND_PRODUCTS_SUCCESS, payload: data };
};
export const fetchRecommendProductFailAction = (error): FetchRecommendProductFailAction => {
    return { type: FETCH_RECOMMEND_PRODUCTS_FAIL, payload: error };
};

/* 
  thunk 可以返回一个函数，而不一定是js对象
  在一个thunk action中可以完成一系列连续的action操作
  并且可以处理异步逻辑
  业务逻辑可以从ui层面挪到这里，代码分层会更清晰
*/
export const giveMeDataActionCreator =
    (): ThunkAction<void, RootState, unknown, RecommentProductAction> =>
    async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartAction());
        try {
            const { data } = await axios.get('/api/productCollections');
            dispatch(fetchRecommendProductSuccessAction(data));
        } catch (error) {
            dispatch(fetchRecommendProductFailAction(error.message));
        }
    };
