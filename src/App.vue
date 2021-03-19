<template>
  <v-app>
    <navigation :drawer="drawer" app/>
    <app-bar :drawer="drawer" app/>

    <v-main app>
      <v-container>
        <router-view/>
      </v-container>

      <app-footer app></app-footer>
    </v-main>
  </v-app>
</template>

<script>

import Navigation from '@/components/core/Navigation'
import AppBar from '@/components/core/AppBar'
import Device from '@/services/device'
import AuthService from '@/services/aws/auth'
import UserService from '@/services/aws/user'
import {User} from '@/model/user'
import Msg from '@/services/msg'
import AppFooter from '@/components/core/AppFooter'

export default {
  name: 'App',
  components: {AppBar, Navigation, AppFooter},
  created() {
    console.log('app.vue: created')
    // 在頁面載入時讀取 sessionStorage 裡的的狀態資訊
    let store = sessionStorage.getItem('store')
    if (store)
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(store)))

    // 頁面重新整理時將 vuex 裡的資訊儲存到 sessionStorage 裡
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })

    // 檢查使用者是否還存在登入狀態，如果仍有狀態且 vuex 裡的 user 資訊為空，才需要重新載入 user 資訊
    AuthService.currentUserInfo()
        .then(info => {
          if (info) {
            console.log('app.vue: currentUserInfo step')
            if (this.$store.state.user.id) return

            console.log(`state id: ${this.$store.state.user.id}, 重新載入 user 資訊`)
            let {username} = info
            UserService.getUserAndAvatar(username)
                .then(data => this.$store.commit('setUser', Object.assign(new User(), data)))
                .catch(err => Msg.error(Msg.i18N.err_app_user, err))
          } else
            this.$store.commit('setUser', null)
        })
        .catch(err => Msg.error(Msg.i18N.err_app_user, err))
  },
  data: () => ({
    drawer: {
      isOpen: !Device.isMobile()
    }
  }),
};
</script>