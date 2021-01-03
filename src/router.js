import Vue from 'vue'
import VueRouter from 'vue-router'

// component
import login from '@/components/Login'
import LibraryInfo from "@/components/LibraryInfo";
import UserManagement from "@/components/manage/UserManagement";
import BookManagement from "@/components/manage/BookManagement";
import MyReservation from "@/components/record/MyReservation";
import ReservationManagement from "@/components/manage/ReservationManagement";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: login},
        {path: '/login', component: login},
        {path: '/library-info', component: LibraryInfo},
        {path: '/user-management', component: UserManagement},
        {path: '/book-management', component: BookManagement},
        {path: '/reservation-management', component: ReservationManagement},
        {path: '/my-reservation', component: MyReservation},
    ]
})

export default router