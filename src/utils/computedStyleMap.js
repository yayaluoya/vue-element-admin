/**
 * 获取元素当时生效的属性值
 * @param {*} el 
 */
export function computedStyleMap(el, pro, h) {
    return el && (el.computedStyleMap?.()?.get(pro)?.value || h(window.getComputedStyle(el)[pro]));
}