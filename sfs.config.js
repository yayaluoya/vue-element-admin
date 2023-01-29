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
module.exports = getConfig(() => {
    return {
        name: '默认配置',
        host: '',
        port: 22,
        username: 'root',
        privateKey: fs.readFileSync(path.join(__dirname, './.ssh/asdf')),
        syncList: [
            {
                key: 'pro',
                title: '正式服',
                paths: [
                    {
                        local: './dist_pro',
                        remote: '',
                    }
                ],
            },
            {
                key: 'dev',
                title: '测试服',
                paths: [
                    {
                        local: './dist_dev',
                        remote: '',
                    }
                ],
            },
        ],
    };
});