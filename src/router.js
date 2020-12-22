import Vue from 'vue'
import VueRouter from 'vue-router'

// component
import login from '@/components/Login'
import LibraryInfo from "@/components/LibraryInfo";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: login},
        {path: '/login', component: login},
        {path: '/LibraryInfo', component: LibraryInfo}
    ]
})

export default router