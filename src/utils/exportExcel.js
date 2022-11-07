
import { saveAs } from "file-saver";
import XLSX from "xlsx";

/**
 * 导出excel表格
 * @param {*} el 表格元素
 * @param {*} name 导出表格的名字
 * @returns 
 */
export function exportExcel(el, name, dataH) {
    if (!el || !name) {
        console.log('导出表格时找不到目标表格元素或者未定义表格名字');
        return;
    }
    try {
        let ws = XLSX.utils.table_to_sheet(el, {
            //明文解析将不解析值
            raw: true,
        });
        let data = XLSX.utils.sheet_to_json(ws, {
            header: 1,
        });
        data = dataH ? dataH(data) : data;
        ws = XLSX.utils.aoa_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array",
        });
        saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            name + ".xlsx"
        );
    } catch (e) {
        console.log('导出表格时出错了', e, wbout)
    }
    return wbout;
}