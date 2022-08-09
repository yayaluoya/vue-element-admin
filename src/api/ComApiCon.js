import { BaseApiCon } from "./BaseApiCon";

/**
 * 公共api控制器
 */
export class ComApiCon extends BaseApiCon {
    /** 单例 */
    static instance = new ComApiCon();
}