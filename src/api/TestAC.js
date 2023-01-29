import { ArrayT } from '@/utils/ArrayT';
import { ResData } from 'yayaluoya-tool/dist/http/ResData';
import { BaseApiCon } from './BaseApiCon'
import { HttpStatus } from "yayaluoya-tool/dist/http/HttpStatus";
import { Env } from '@/utils/Env';
const { port } = require('../../.node/server/port');

export class TestAC extends BaseApiCon {
    /** 单例 */
    static instance = new TestAC();

    get op() {
        return {
            baseURL: `http://localhost:${port}/`,
        };
    }

    /** 
    * 响应数据获取
    * 如果响应成功的话返回 ResData
    * 如果响应失败的话抛出ResData的异常
    */
    resData_(data, con, res) {
        let resData = new ResData(data?.data, data?.code, data?.msg, data?.time);
        if (resData.status != HttpStatus.OK) {
            throw resData;
        }
        return resData;
    }

    /** 测试接口 */
    test(data) {
        if (Env.dev) {
            return this.postData({
                url: '/test',
                data,
            });
        } else {
            return new Promise((r) => {
                setTimeout(() => {
                    r(data);
                }, 300);
            });
        }
    }

    /** 请求列表 */
    list(op) {
        let { size, current, ...data } = op;
        return this.test({
            records: ArrayT.fill(
                data,
                Math.min(
                    size,
                    100 - size * (current - 1)
                )
            ).map((_, i) => {
                _.id = i + 1;
                return _;
            }),
            total: 100,
        });
    }

    /** 上传文件 */
    uploadFile(file, config) {
        let data = new FormData();
        data.set('file', file);
        return this.postData({
            url: '/test',
            data,
            ...config,
        });
    }
}