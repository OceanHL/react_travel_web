/* 
    ActionCreator 接收payload数据，返回一个【action对象】
*/
/* 
    第一步：定义常量
*/
export const CHANGE_LANGUAGE = 'change_language';
export const ADD_LANGUAGE = 'add_language';

/* 
    第二步：定义Action接口，并且【混合在一起】导出给reducer使用
*/
interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE; // 类型为 【取 CHANGE_LANGUAGE 变量的值】
    payload: 'zh' | 'en';
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE;
    payload: { name: string; code: string };
}

// 导出混合类型
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (languageCode: 'zh' | 'en'): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode,
    };
};

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code },
    };
};
