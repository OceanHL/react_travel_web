/*
 * @Author: jhl
 * @Date: 2021-08-20 10:22:19
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-27 16:22:46
 * @Description:
 */
import { useEffect, useState } from 'react';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { useSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LanguageActionTypes } from '../../redux/language/languageActions';
import {
    changeLanguageActionCreator,
    addLanguageActionCreator,
} from '../../redux/language/languageActions';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

/* 
    自定义自己的 JwtPayload 接口类型，继承原来的 JwtPayload 接口类型
        - 多出一个username字段
*/
interface JwtPayload extends DefaultJwtPayload {
    username: string;
}

const Header: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const match = useRouteMatch();
    const { t } = useTranslation();
    const language = useSelector(state => state.language.language);
    const languageList = useSelector(state => state.language.languageList);
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const [username, setUsername] = useState<string>('');
    // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    useEffect(() => {
        // 如果返回jwt
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username);
        }
    }, [jwt]);
    const menuClickHandler = e => {
        if (e.key === 'new') {
            // 处理新语言添加action
            dispatch(addLanguageActionCreator('新语言', 'new_lang'));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    };
    const onLogout = () => {
        dispatch(userSlice.actions.logOut());
        history.push('/');
        // 刷新页面
        /* 
            传true时：强制浏览器从服务器加载页面资源
            false/未传参数时，浏览器则可从缓存中读取页面。
        */
        // window.location.reload(false); // 可加可不加
    };
    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles['inner']}>
                    <Typography.Text>让旅游更幸福</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map(l => {
                                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                                })}
                                <Menu.Item key='new'>{t('header.add_new_language')}</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        {language === 'zh' ? '中文' : 'English'}
                    </Dropdown.Button>
                    {jwt ? (
                        <Button.Group className={styles['button-group']}>
                            <span>
                                {t('header.welcome')}
                                <Typography.Text strong>{username}</Typography.Text>
                            </span>
                            <Button
                                loading={shoppingCartLoading}
                                onClick={() => history.push('/shoppingCart')}
                            >
                                {t('header.shoppingCart')}({shoppingCartItems.length})
                            </Button>
                            <Button onClick={onLogout}>{t('header.signOut')}</Button>
                        </Button.Group>
                    ) : (
                        <Button.Group className={styles['button-group']}>
                            <Button
                                onClick={() => {
                                    /* 
                                    register是追加到路径后面
                                    /register是跳转
                                */
                                    history.push('/register');
                                }}
                            >
                                {t('header.register')}
                            </Button>
                            <Button
                                onClick={() => {
                                    history.push('/signIn');
                                }}
                            >
                                {t('header.signin')}
                            </Button>
                        </Button.Group>
                    )}
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => history.push('/')}>
                    <img src={logo} alt='logo' className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles['title']}>
                        {t('header.title')}
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder='请输入旅游目的地、主题、或关键字'
                    className={styles['search-input']}
                    onSearch={keywords => history.push(`/search/${keywords}`)}
                />
            </Layout.Header>
            <Menu mode={'horizontal'} className={styles['main-menu']}>
                <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
                <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
                <Menu.Item key={3}>{t('header.group')}</Menu.Item>
                <Menu.Item key={4}>{t('header.backpack')}</Menu.Item>
                <Menu.Item key={5}>{t('header.private')}</Menu.Item>
                <Menu.Item key={6}>{t('header.cruise')}</Menu.Item>
                <Menu.Item key={7}>{t('header.hotel')}</Menu.Item>
                <Menu.Item key={8}>{t('header.local')}</Menu.Item>
                <Menu.Item key={9}>{t('header.theme')}</Menu.Item>
                <Menu.Item key={10}>{t('header.custom')}</Menu.Item>
                <Menu.Item key={11}>{t('header.study')}</Menu.Item>
                <Menu.Item key={12}>{t('header.visa')}</Menu.Item>
                <Menu.Item key={13}>{t('header.enterprise')}</Menu.Item>
                <Menu.Item key={14}>{t('header.high_end')}</Menu.Item>
                <Menu.Item key={15}>{t('header.outdoor')}</Menu.Item>
                <Menu.Item key={16}>{t('header.insurance')}</Menu.Item>
            </Menu>
        </div>
    );
};

export default Header;
