/*
 * @Author: jhl
 * @Date: 2021-08-20 14:37:24
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-20 15:07:32
 * @Description:
 */
import React from 'react';
import { Menu } from 'antd';
import { GifOutlined } from '@ant-design/icons';
import styles from './SideMenu.module.css';
import { sideMenuList } from './mockup';

const SideMenu: React.FC = () => {
    return (
        <Menu mode='vertical' className={styles['side-menu']}>
            {sideMenuList.map((m, index) => (
                <Menu.SubMenu
                    key={`side-menu-${m.title}-${index}`}
                    title={
                        <span>
                            <GifOutlined />
                            {m.title}
                        </span>
                    }
                >
                    {m.subMenu.map((sm, smindex) => (
                        <Menu.SubMenu
                            key={`side-sub-menu-${m.title}-${sm.title}-${smindex}`}
                            title={
                                <span>
                                    <GifOutlined />
                                    {sm.title}
                                </span>
                            }
                        >
                            {sm.subMenu.map((sms, smsindex) => (
                                <Menu.Item
                                    key={`side-sub-sub-menu-${m.title}-${sm.title}-${sms}-${smsindex}`}
                                >
                                    <span>
                                        <GifOutlined />
                                        {sms}
                                    </span>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    );
};

export default SideMenu;
