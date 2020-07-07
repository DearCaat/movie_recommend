import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Start from '../views/Start.vue'
import UserCenter from '../views/UserCenter.vue'
import AdminCenter from '../views/AdminCenter.vue'
import HomePage from '../views/HomePage.vue'
import Comment from '../views/Comment.vue'
import Recommand from '../views/Recommand.vue'
import UserChangeInfo from '../views/UserChangeInfo.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Start',
        component: Start
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
    },
    {
        path: '/UserCenter',
        name: 'UserCenter',
        component: UserCenter
    },
    {
        path: '/Comment',
        name: 'Comment',
        component: Comment
    },
    {
        path: '/AdminCenter',
        name: 'AdminCenter',
        component: AdminCenter
    },
    {
        path: '/Recommand',
        name: 'Recommand',
        component: Recommand
    },
    {
        path: '/UserChangeInfo',
        name: 'UserChangeInfo',
        component: UserChangeInfo
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router