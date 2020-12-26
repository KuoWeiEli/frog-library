import Vue from 'vue'
import VueRouter from 'vue-router'

// component
import login from '@/components/Login'
import LibraryInfo from "@/components/LibraryInfo";
import UserManagement from "@/components/user/UserManagement";
import BookManagement from "@/components/book/BookManagement";
import MyReservation from "@/components/record/MyReservation";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: login},
        {path: '/login', component: login},
        {path: '/library-info', component: LibraryInfo},
        {path: '/user-management', component: UserManagement},
        {path: '/book-management', component: BookManagement},
        {path: '/my-reservation', component: MyReservation},
    ]
})

export default router