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
            <v-img src="https://randomuser.me/api/portraits/men/1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title">
              0400-黃國維
            </v-list-item-title>
            <v-list-item-subtitle>eli.huang@frog-jump.com.tw</v-list-item-subtitle>
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
          <v-btn block to="/login">
            登入
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  name: 'navigation',
  props: {
    drawer: {
      isOpen: {}
    },
  },
  data: () => ({
    items: [
      {title: '館藏資訊', icon: 'mdi-bookshelf', url: '/library-info'},
      {title: '我的預約', icon: 'mdi-account-clock', url: '/my-reservation'},
      {title: '預約管理', icon: 'mdi-book-account', url: '/reservation-management'},
      {title: '書庫管理', icon: 'mdi-book-cog', url: '/book-management'},
      {title: '員工管理', icon: 'mdi-account-group', url: '/user-management'}
    ]
  }),
}
</script>