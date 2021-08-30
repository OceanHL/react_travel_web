/*
 * @Author: jhl
 * @Date: 2021-08-26 18:01:52
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-26 18:34:45
 * @Description:
 */
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './RegisterPage.module.css';

interface RegisterFomType {
    username: string;
    password: string;
    confirm: string;
}

const RegisterFom: React.FC = () => {
    const history = useHistory();

    // 校验成功
    const onFinish = async (values: RegisterFomType) => {
        console.log('Success:', values);
        try {
            // 因为返回204，响应成功，但是没有响应体
            await axios.post('/api/auth/register', {
                email: values.username,
                username: values.password,
                confirm: values.confirm,
            });
            history.push('/signIn/');
        } catch (error) {
            message.error('请求失败');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles['register-form']}
        >
            <Form.Item
                label='用户名'
                name='username'
                rules={[{ required: true, message: '请输入你的用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='密码'
                name='password'
                rules={[{ required: true, message: '请输入你的密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label='确认密码'
                name='confirm'
                hasFeedback
                rules={[
                    { required: true, message: '请输入确认密码' },
                    ({ getFieldValue }) => ({
                        // 确认密码为空，或者
                        validator(_, value) {
                            // 密码不空，且与password相等，通过
                            // 密码为空，也通过
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次密码不一致！'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default RegisterFom;
