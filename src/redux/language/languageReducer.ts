/* eslint-disable import/no-anonymous-default-export */
/* 
  reducer是数据state的处理过程，对数据state以旧换新
    - state：为store仓库中的旧数据state
    - action: 指挥reducer变换数据的指令
    - 返回值：则是经过数据变化生成的新数据state
*/
import i18n from 'i18next';
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from './languageActions';
// 定义初始化数据的接口
export interface LanguageState {
    language: 'en' | 'zh';
    languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
    language: 'zh',
    languageList: [
        { name: '中文', code: 'zh' },
        { name: 'English', code: 'en' },
    ],
};

// 不能修改参数state【因为是immutable】
export default (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload };
        case ADD_LANGUAGE:
            return { ...state, languageList: [...state.languageList, action.payload] };
        default:
            return state;
    }
};
