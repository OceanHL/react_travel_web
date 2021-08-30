/*
 * @Author: jhl
 * @Date: 2021-08-28 08:59:45
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-28 16:59:15
 * @Description:
 */
import React from 'react';
import { PaymentForm, CheckOutCard } from '../../components';
import { MainLayout } from '../../layouts';
import { Row, Col } from 'antd';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../redux/order/slice';

const PlaceOrder: React.FC = () => {
    const jwt = useSelector(s => s.user.token) as string;
    const { loading, currentOrder: order } = useSelector(s => s.order);
    const dispatch = useDispatch();
    return (
        <div>
            <MainLayout>
                <Row>
                    <Col span={12}>
                        <PaymentForm />
                    </Col>
                    <Col span={12}>
                        <CheckOutCard
                            loading={loading}
                            order={order}
                            onCheckout={() => {
                                dispatch(placeOrder({ jwt, orderId: order.id }));
                            }}
                        />
                    </Col>
                </Row>
            </MainLayout>
        </div>
    );
};

export default PlaceOrder;
