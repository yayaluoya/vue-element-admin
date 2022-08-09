import { BaseApiCon } from './BaseApiCon'

export class TestAC extends BaseApiCon {
    /** 单例 */
    static instance = new TestAC();

    /** 可配置选项 */
    get op() {
        return {
            baseURL: 'http://localhost:1235/',
        };
    }

    /** 测试接口 */
    test(data) {
        return this.postData({
            url: '/test',
            data,
        });
    }
}