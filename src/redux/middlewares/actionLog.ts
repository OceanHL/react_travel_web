/*
 * @Author: jhl
 * @Date: 2021-08-25 11:43:10
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-25 11:46:39
 * @Description: actionLog中间件
 */
import { Middleware } from 'redux';
const actionLog: Middleware = store => next => action => {
    console.log('state 当前', store.getState());
    console.log('fire action', action);
    // 分发action
    next(action);
    console.log('state 更新', store.getState());
};
export default actionLog;
