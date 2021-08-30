/*
 * @Author: jhl
 * @Date: 2021-08-26 17:22:20
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-26 17:25:02
 * @Description:
 */
import React from 'react';
import styles from './MainLayout.module.css';
import { Header, Footer } from '../../components';

const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            {/* 页面内容 content */}
            <div className={styles['page-content']}>{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
