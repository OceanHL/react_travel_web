/*
 * @Author: jhl
 * @Date: 2021-08-20 17:35:32
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-27 09:43:03
 * @Description:
 */
import React from 'react';
import { UserLayout } from '../../layouts';
import SignInForm from './SignInForm';

const SignInPage: React.FC = () => {
    return (
        <>
            <UserLayout>
                <SignInForm />
            </UserLayout>
        </>
    );
};

export default SignInPage;
