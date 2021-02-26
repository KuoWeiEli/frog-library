<template>
  <v-card
      class="mx-auto"
      width="300"
  >
    <v-navigation-drawer
        v-model="drawer.isOpen"
        app
        fixed
        clipped
    >
      <template v-slot:prepend>
        <v-list-item class="px-3" link>
          <v-list-item-avatar>
            <v-img :src="user.id? user.avatar: require('../../assets/icon_employee_normal.svg')"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title">
              {{ user.empid }}-{{ user.nameTW }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>

      <v-list-item>
        <v-list-item-content>
          <v-list
              dense
              nav
          >
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.url"
                link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>
      </v-list-item>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
              v-if="!user.id"
              block
              to="/login">
            登入
          </v-btn>
          <v-btn
              v-if="user.id"
              block
              @click="signOut"
          >
            登出
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>
<script>

import AuthService from '@/services/aws/auth'
import UserService from '@/services/aws/user'
import Msg from '@/services/msg'
import {User} from '@/model/user'

export default {
  name: 'navigation',
  props: {
    drawer: {
      isOpen: {}
    },
  },
  created() {
    // 訂閱使用者
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setUser') {
        this.user = state.user
      }
    })

    // 檢查使用者是否還存在登入狀態，如果有的話則取得資料
    AuthService.currentUserInfo()
        .then(info => {
          if (info) {
            let {username} = info
            UserService.getUserAndAvatar(username)
                .then(data => this.$store.commit('setUser', Object.assign(new User(), data)))
                .catch(console.error)
          } else
            this.$store.commit('setUser', null)
        })
        .catch(console.error)
  },
  data: () => ({
    items: [
      {title: '館藏資訊', icon: 'mdi-bookshelf', url: '/library-info'},
      {title: '我的預約', icon: 'mdi-account-clock', url: '/my-reservation'},
      {title: '預約管理', icon: 'mdi-book-account', url: '/reservation-management'},
      {title: '書庫管理', icon: 'mdi-book-cog', url: '/book-management'},
      {title: '員工管理', icon: 'mdi-account-group', url: '/user-management'}
    ],
    user: {}
  }),
  methods: {
    signOut() {
      AuthService.signOut()
          .then(() => {
            Msg.success('已成功登出！')
            this.$store.commit('setUser', null)
          })
          .catch(err => {
            console.log(err)
            Msg.error('登出發生錯誤！請稍後再試！')
          })
    }
  }
}
</script>