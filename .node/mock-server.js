const path = require('path')
const child_process = require('child_process');
const createProxyMiddleware = require('http-proxy-middleware');
const { port } = require('./server/server');

module.exports = function (app) {
    // 启动测试server
    child_process.fork(path.join(__dirname, '../node_modules/nodemon/bin/nodemon.js'), [
        path.join(__dirname, './server/server.js'),
        '--watch',
        path.join(__dirname, './server/**')
    ]);

    //添加一个代理
    app.use(
        '/test_api__',
        createProxyMiddleware({
            target: `http://localhost:${port}/`,
            changeOrigin: true,
            pathRewrite: {
                '^/test_api__': '',
            }
        })
    );
}