/*
 * @Author: jhl
 * @Date: 2021-08-20 16:34:20
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-26 17:27:58
 * @Description:
 */
import { Component } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import {
    Header,
    Footer,
    Carsousel,
    SideMenu,
    ProductCollection,
    BusinessPartners,
} from '../../components';
// import { productList1, productList2, productList3 } from './mockups';
import styles from './Home.module.css';
import sideImage from '../../assets/images/sider_2019_02-04-2.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_12-09.png';
import microsoftImage from '../../assets/images/microsoft-80658_640.png';
import facebookImage from '../../assets/images/facebook-807588_640.png';
import followImage from '../../assets/images/follow-826033_640.png';
import iconImage from '../../assets/images/icon-720944_640.png';
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { giveMeDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions';
import { MainLayout } from '../../layouts';

const mapStateToProps = (state: RootState) => ({
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList,
});

const mapDispatchToProps = dispatch => ({
    giveMeData: () => {
        dispatch(giveMeDataActionCreator());
    },
});

type PropsType = WithTranslation &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends Component<PropsType> {
    componentDidMount() {
        this.props.giveMeData();
    }

    render() {
        const { t } = this.props;
        const { productList, loading, error } = this.props;
        if (loading) {
            return (
                <Spin
                    size='large'
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '100%',
                    }}
                />
            );
        }
        if (error) {
            return <div>网站出错了：{error}</div>;
        }
        return (
            <>
                <MainLayout>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <SideMenu />
                        </Col>
                        <Col span={18}>
                            <Carsousel />
                        </Col>
                    </Row>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type='warning'>
                                {t('home_page.hot_recommended')}
                            </Typography.Title>
                        }
                        sideImage={sideImage}
                        products={productList[0].touristRoutes}
                    ></ProductCollection>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type='danger'>
                                {t('home_page.new_arrival')}
                            </Typography.Title>
                        }
                        sideImage={sideImage2}
                        products={productList[1].touristRoutes}
                    ></ProductCollection>
                    <ProductCollection
                        title={
                            <Typography.Title level={3} type='success'>
                                {t('home_page.domestic_travel')}
                            </Typography.Title>
                        }
                        sideImage={sideImage3}
                        products={productList[2].touristRoutes}
                    ></ProductCollection>

                    <BusinessPartners
                        companies={[
                            { src: microsoftImage },
                            { src: facebookImage },
                            { src: followImage },
                            { src: iconImage },
                        ]}
                    />
                </MainLayout>
            </>
        );
    }
}

const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));
export default HomePage;
