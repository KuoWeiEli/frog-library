import Vue from 'vue'
import VueRouter from 'vue-router'

// component
import login from '@/components/Login'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: login},
        {path: '/login', component: login}
    ]
})

export default router