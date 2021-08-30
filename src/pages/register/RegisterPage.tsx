/*
 * @Author: jhl
 * @Date: 2021-08-20 17:38:21
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-26 18:04:04
 * @Description:
 */
import { UserLayout } from '../../layouts';
import RegisterForm from './RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <>
            <UserLayout>
                <RegisterForm  />
            </UserLayout>
        </>
    );
};

export default RegisterPage;
