import Vue from 'vue'
import App from './App'
//导入vuex
import store from './store/index.js'
Vue.prototype.$store = store

/*
*自己写的文件放在这下面导入
*/
//全局变量配置文件
import globle from './globle.js'
import http from './public/http.js'
Vue.prototype.$globle = globle;
Vue.prototype.$request = http;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
