/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: jhl
 * @Date: 2021-08-27 09:40:29
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-27 11:22:31
 * @Description:
 */
import React, { useEffect } from 'react';
import styles from './SignInForm.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { signIn } from '../../redux/user/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface UserFormType {
    username: string;
    password: string;
}

const SignInForm: React.FC = () => {
    const jwt = useSelector(state => state.user.token);
    const error = useSelector(state => state.user.error);
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();
    const history = useHistory();

    const onFinish = (values: UserFormType) => {
        console.log('Success:', values);
        dispatch(signIn({ email: values.username, password: values.password }));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        // jwt发生变化，就
        if (jwt !== null) history.push('/');
    }, [jwt]);
    return (
        <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles['sigin-form']}
        >
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignInForm;
