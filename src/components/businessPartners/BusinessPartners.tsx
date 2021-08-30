/*
 * @Author: jhl
 * @Date: 2021-08-20 15:47:50
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-24 11:06:35
 * @Description:
 */
import React from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './BusinessPartners.module.css';

interface PropsType {
    companies: { src: string }[];
}
const BusinessPartners: React.FC<PropsType> = ({ companies }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.content}>
            <Divider orientation='left'>
                <Typography.Title level={3}>{t('home_page.joint_venture')}</Typography.Title>
            </Divider>
            <Row>
                {companies.map((c, index) => (
                    <Col span={6} key={'bussiness-partner' + index}>
                        <img
                            alt='bussiness-partner'
                            src={c.src}
                            style={{
                                display: 'block',
                                width: '80%',
                                margin: '0 auto',
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BusinessPartners;
