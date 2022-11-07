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

    /**
     * 获取验证规则
     * @param {*} f 
     * @returns 
     */
    static getRules(f, required = true) {
        return {
            required,
            validator: function (rule, value, callBack) {
                callBack(f.call(this, rule, value));
            },
        };
    }

    /**
     * {id,name}结构的数据转{value,label}结构的数据
     * @param {*} data 
     */
    static itemToSelectOp(data) {
        return {
            value: data.id,
            label: data.name,
        };
    }
}

/**
 * 规则工具
 */
export class RulesT {
    static strLength(len = [0, 0], title = '', required = true) {
        return FormT.getRules(function (_, value) {
            if (value.length < len[0]) {
                return `${title}的长度不能小于${len[0]}个字符`;
            }
            if (len[1] && value.length > len[1]) {
                return `${title}的长度不能大于${len[1]}个字符`;
            }
        }, required);
    }

    static strIf(title = '', required = true) {
        return FormT.getRules(function (_, value) {
            if (!value) {
                return title;
            }
        }, required);
    }

    static arrayIf(title = '', required = true) {
        return FormT.getRules(function (_, value) {
            if (!value || value.length <= 0) {
                return title;
            }
        }, required);
    }
}