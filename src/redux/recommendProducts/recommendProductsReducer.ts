/* eslint-disable import/no-anonymous-default-export */
import {
    FETCH_RECOMMEND_PRODUCTS_FAIL,
    FETCH_RECOMMEND_PRODUCTS_START,
    FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    RecommentProductAction,
} from './recommendProductsActions';
/* 
  1. 定义state的数据结构接口
*/
interface RecommendProductsState {
    productList: any[];
    loading: boolean;
    error: string | null;
}
/* 
  2. 定义默认值state
*/
const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: [],
};
/* 
  3. 参数state传递默认值，并且指定action的类型，返回新的state对象
*/
export default (state = defaultState, action: RecommentProductAction) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return { ...state, loading: true };
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, productList: action.payload };
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
