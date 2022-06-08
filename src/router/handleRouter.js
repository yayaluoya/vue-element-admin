/**
 * 处理路由配置
 */
export function handleRouter(router) {
    router = setRouteComName(router);
    setFullPath(router);
    return router;
}


function setFullPath(router, p = []) {
    if (!router || router.length <= 0) { return router; }
    for (let o of router) {
        o.fullPath = [...p, o.path].join('/');
        setFullPath(o.children, [...p, o.path]);
    }
}

function setRouteComName(router) {
    if (!router || router.length <= 0) { return router; }
    for (let route of router) {
        let com = route.component;
        if (com) {
            if (typeof com == 'function') {
                route.component = function () {
                    return com().then((com) => {
                        // console.log(route.name, com);
                        asyncRouteName(route, com.default);
                        return com;
                    });
                }
            } else {
                asyncRouteName(route, com);
            }
        }
        setRouteComName(route.children);
    }
    return router;
}

/**
 * 同步路由名字
 * 只有当路由有名字，对应的组件没名字的时候才同步
 * @param {*} route 
 * @param {*} com 
 */
function asyncRouteName(route, com) {
    if (route.name && !com.name) {
        com.name = route.name;
    }
}