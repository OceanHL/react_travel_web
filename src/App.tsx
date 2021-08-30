/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
    HomePage,
    SignIn,
    RegisterPage,
    DetailPage,
    SearchPage,
    ShoppingCart,
    PlaceOrder,
} from './pages';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from './redux/hooks';
import { getShoppingCart } from './redux/shoppingCart/slice';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5050';

/* 
    私有路由，判断用户是否登陆
*/
const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
    // 内置路由组件，会接收路由参数
    const routeComponent = props => {
        console.log('routeComponent', props);

        return isAuthenticated ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{ pathname: '/signIn' }} />
        );
    };

    return <Route render={routeComponent} {...rest} />;
};

function App() {
    const jwt = useSelector(s => s.user.token);
    const dispath = useDispatch();

    useEffect(() => {
        if (jwt) {
            dispath(getShoppingCart(jwt));
        }
    }, [jwt]);

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/signIn' component={SignIn} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/detail/:touristRouteId' component={DetailPage} />
                    {/* /:keywords? 后面的?代表该参数可选 */}
                    <Route path='/search/:keywords?' component={SearchPage} />
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path='/shoppingCart'
                        component={ShoppingCart}
                    />
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path='/placeOrder'
                        component={PlaceOrder}
                    />
                    <Route render={() => <h1>404 not fount 页面去火星了！</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
