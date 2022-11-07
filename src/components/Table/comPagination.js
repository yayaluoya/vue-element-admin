import { Pagination } from "yayaluoya-tool/dist/web/Pagination";

/**
 * 获取公共分页 pagination
 */
export function comPagination(number = 10, numbers = [10, 50, 100, 500]) {
    return new Pagination(number, numbers);
    // return {
    //     total: 0,
    //     currentPage: 1,
    //     pageSize: number,
    //     pageSizes: numbers,
    // };
}