import { BaseApiCon as BaseApiCon_ } from "yayaluoya-tool/dist/node/BaseApiCon";
import { ResData } from "yayaluoya-tool/dist/http/ResData";
import { getToken } from "@/utils/auth";
import moment from "moment";
import { GlobalE } from "yayaluoya-tool/dist/web/event/GlobalE";

/**
 * 基类api控制器
 */
export class BaseApiCon extends BaseApiCon_ {
    /** api源 */
    static get baseURL() {
        return process.env.VUE_APP_BASE_API;
    }
    static get baseURL2() {
        return process.env.VUE_APP_BASE_API2;
    }

    /** 可配置选项 */
    get op() {
        return {
            baseURL: BaseApiCon.baseURL,
            timeout: 1000 * 60,
        };
    }

    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    resData_(data, con, res) {
        let resData = new ResData(data?.data, data?.code, data?.msg || '网络请求失败，请重试', data?.time);
        if (!/^(40[0-9])$/.test(resData.status)) {
            // 登录超时
            if (resData.status == 400) {
                //退出登录
                GlobalE.instance.emit('loginOut');
            }
            throw resData;
        }
        return resData;
    }

    async request_(c) {
        c.headers = {
            ...c.headers,
        };
        return c;
    }
}