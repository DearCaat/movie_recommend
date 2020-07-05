import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import globalVariable from './assets/global_variable'

Vue.use(Element)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = globalVariable

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')