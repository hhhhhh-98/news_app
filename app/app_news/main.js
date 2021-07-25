import Vue from 'vue'
import App from './App'

//自己写的文件放在这下面导入
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
