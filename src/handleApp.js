import Vue from 'vue'

let myCom = require.context('./components/my', false, /\.vue$/);

//注册全局的my组件
for (let path of myCom.keys()) {
    Vue.component('my-' + path.match(/([a-zA-Z]+)\.vue$/)[1].replace(/[A-Z]/g, (_, index) => {
        if (index == 0) {
            return _.toLowerCase();
        } else {
            return '-' + _.toLowerCase();
        }
    }), myCom(path).default);
}
