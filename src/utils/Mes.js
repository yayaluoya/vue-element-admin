import { Message } from "element-ui";

/** 消息处理器 */
export class Mes {
    /**
     * 是否提示
     */
    static ifMes = true;

    /**
     * 成功提示
     * @param _str 
     */
    static success(_str) {
        Mes.ifMes && Message.success(_str);
    }
    /**
     * 警告提示
     * @param _str 
     */
    static warning(_str) {
        Mes.ifMes && Message.warning(_str);
    }
    /**
     * info提示
     * @param _str 
     */
    static info(_str) {
        Mes.ifMes && Message.info(_str);
    }
    /**
     * 异常提示
     * @param _str 
     */
    static error(_str) {
        Mes.ifMes && Message.error(_str);
    }

    /**
     * 处理api请求的错误
     */
    static handleApiCatch(data) {
        try {
            Mes.ifMes && Message.error(data.msg);
        } catch {
            console.error(data);
        }
    }
    /**
     * 处理表单验证失败的错误
     * @param {*} e 
     */
    static handleFormCatch(e) {
        console.warn('表单验证失败', e);
    }
}