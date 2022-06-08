import { Mes } from "./Mes";
import { FormT as FormT_ } from "yayaluoya-tool/dist/web/FormT";

/**
 * 表单工具
 */
export class FormT extends FormT_ {
    /**
     * 表单验证
     * @param {*} com 表单实例
     * @param {*} file 需要验证的字段，如果不传则验证整个表单
     */
    static v(com) {
        return new Promise((r) => {
            com.validate()
                .then(r)
                .catch(Mes.handleFormCatch);
        });
    }

    /**
     * 反向获取选择器的label
     */
    static getSelectLabel(list, valueKey, labelKey, key) {
        if (!list || list.length == 0) { return '' }
        let item = list.find((_) => {
            return _[valueKey] == key;
        });
        if (item) {
            return item[labelKey] || '';
        }
        return '';
    }
}