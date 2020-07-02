import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import Register from '../views/Register.vue'
import Start from '../views/Start.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Start',
        component: Start
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router