import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from './redux/store';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import './i18n/config';

moment.locale('zh-cn');

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
