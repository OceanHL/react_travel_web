/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: jhl
 * @Date: 2021-08-26 15:12:30
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-26 17:29:42
 * @Description:
 */
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './SearchPage.module.css';
import { Header, Footer, FilterArea, ProductList } from '../../components';
import { searchProduct } from '../../redux/productSearch/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts';

interface MatchParams {
    keywords: string;
}

const SearchPage: React.FC = () => {
    const { keywords } = useParams<MatchParams>();
    const {
        loading,
        error,
        data: productList,
        pagination,
    } = useSelector(state => state.productSearch);
    const dispatch = useDispatch();
    const location = useLocation();

    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({ nextPage, pageSize, keywords }));
    };

    useEffect(() => {
        dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
    }, [location]);

    if (loading) {
        return (
            <Spin
                size='large'
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                }}
            />
        );
    }
    if (error) {
        return <div>网站出错了：{error}</div>;
    }
    return (
        <>
            <MainLayout>
                {/* 分类过滤器 */}
                <div className={styles['product-list-container']}>
                    <FilterArea />
                </div>
                {/* 产品列表 */}
                <div className={styles['product-list-container']}>
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            </MainLayout>
        </>
    );
};

export default SearchPage;
