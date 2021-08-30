/*
 * @Author: jhl
 * @Date: 2021-08-23 09:40:09
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-23 10:47:48
 * @Description:
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_en from './en.json'; // 导入英文映射json文件
import translation_zh from './zh.json'; // 导入中文映射json文件

/* 
  翻译(提示:将它们移动到一个JSON文件中并导入它们，或者更好的是，将它们与您的代码分开管理:https://react.i18next.com/guides/multiple-translation-files)  
*/
const resources = {
    // key为lng语言类型，value为翻译对应的json文件
    en: {
        translation: translation_en,
    },
    zh: {
        translation: translation_zh,
    },
};

i18n.use(initReactI18next) // 通过i18n向下传递到react-i18next
    .init({
        resources,
        lng: 'zh', // 【指定初始化使用的语言】 // 语言使用，更多信息请点击:https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // 您可以使用i18n。 changellanguage函数手动更改语言:https://www.i18next.com/overview/api#changelanguage
        // 如果使用语言检测器，不要定义LNG选项

        interpolation: {
            escapeValue: false, // react已经内置了xss防御的机制
        },
    });

export default i18n;
