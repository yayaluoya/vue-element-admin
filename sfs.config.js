/**
 * 带代码提示的获取config的方法
 * module.exports = getConfig({...});
 */
const { getConfig } = require("server-file-sync");
const fs = require('fs');
const path = require('path');

/**
 * server-file-sync 的默认配置文件
 */
module.exports = getConfig({
    /** 配置名字 */
    name: '默认配置',
    /** 主机地址 */
    host: '',
    /** 端口号 */
    port: 22,
    /** 用户名 */
    username: 'root',
    /** 私钥密码 */
    passphrase: 'asdf',
    /** 私钥字符串 */
    privateKey: fs.readFileSync(path.join(__dirname, './.ssh/asdf')),
    /** 同步列表 */
    syncList: [
        {
            /** key */
            key: 'pro',
            /** 标题 */
            title: '正式服',
            /** 路径列表 */
            paths: [
                {
                    /** 本地地址 */
                    local: './dist_pro',
                    /** 远程地址 */
                    remote: '',
                }
            ],
        },
        {
            /** key */
            key: 'dev',
            /** 标题 */
            title: '测试服',
            /** 路径列表 */
            paths: [
                {
                    /** 本地地址 */
                    local: './dist_dev',
                    /** 远程地址 */
                    remote: '',
                }
            ],
        },
    ],
    /** 是否监听 */
    watch: false,
});