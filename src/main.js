import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import globalVariable from './assets/global_variable'
import utility from './assets/utility'
import './index.css'
import Meta from 'vue-meta'

Vue.use(Element)
Vue.use(utility)
Vue.use(Meta)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = globalVariable

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')