/* eslint-disable import/no-anonymous-default-export */
/*
 * @Author: jhl
 * @Date: 2021-08-24 16:20:37
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-25 09:06:11
 * @Description:
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:5050',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': '/api',
            },
        })
    );
};
