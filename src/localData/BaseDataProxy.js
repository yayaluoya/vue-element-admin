import settings from "@/settings";
import { BaseDataProxy as BaseDataProxy_ } from "yayaluoya-tool/dist/web/localData/BaseDataProxy";

export class BaseDataProxy extends BaseDataProxy_ {
    /** 保存的名字，默认是类名 */
    get name() {
        return `${settings.enName}:${this.constructor.name}@${settings.version}`;
    }

    constructor() {
        super();

        //TODO 测试用
        window[this.constructor.name] = this;
    }
}