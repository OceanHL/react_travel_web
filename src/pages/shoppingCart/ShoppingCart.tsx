/*
 * @Author: jhl
 * @Date: 2021-08-27 14:44:50
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-28 09:36:41
 * @Description:
 */
import React from 'react';
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from '../../components';
import { clearShoppingCart, checkOut } from '../../redux/shoppingCart/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ShoppingCart: React.FC = props => {
    const loading = useSelector(s => s.shoppingCart.loading);
    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const jwt = useSelector(s => s.user.token) as string;
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    <div className={styles['payment-card-container']}>
                        <PaymentCard
                            loading={loading}
                            originalPrice={shoppingCartItems
                                .map(s => s.originalPrice)
                                .reduce((acc, cur) => acc + cur, 0)}
                            price={shoppingCartItems
                                .map(
                                    s =>
                                        s.originalPrice *
                                        (s.discountPresent ? s.discountPresent : 1)
                                )
                                .reduce((acc, cur) => acc + cur, 0)}
                            onCheckout={() => {
                                // 如果有商品，才进行结算逻辑的分发
                                if (shoppingCartItems.length <= 0) return;
                                dispatch(checkOut(jwt));
                                history.push('/placeOrder');
                            }}
                            onShoppingCartClear={() => {
                                dispatch(
                                    clearShoppingCart({
                                        jwt,
                                        itemsId: shoppingCartItems.map(s => s.id),
                                    })
                                );
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default ShoppingCart;
