import { BaseApiCon } from "./BaseApiCon";

/**
 * 公共api控制器
 */
export class ComApiCon extends BaseApiCon {
    /** 单例 */
    static instance = new ComApiCon();

    /** 测试api */
    testData(data = {}, time = 500) {
        return new Promise((r) => {
            setTimeout(() => {
                r(data);
            }, 500);
        });
    }
}