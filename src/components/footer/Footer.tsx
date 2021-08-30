/*
 * @Author: jhl
 * @Date: 2021-08-20 10:27:50
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-23 10:19:21
 * @Description:
 */
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Layout.Footer>
            <Typography.Title level={3} style={{ textAlign: 'center' }}>
                {t('footer.detail')}
            </Typography.Title>
        </Layout.Footer>
    );
};

export default Footer;
