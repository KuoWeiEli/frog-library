<template>
  <v-app-bar
      v-bind="$attrs"
      app
      dense
      clipped-left
      color="green lighten-4">
    <div class="d-flex align-center">
      <v-app-bar-nav-icon
          @click="drawer.isOpen = !drawer.isOpen"
          class="shrink mr-2 hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <router-link to="/">

        <v-img
            alt="Frog-Jump Logo"
            class="shrink mr-2 hidden-sm-and-up"
            contain
            :src="require('../../assets/icon_intro.svg')"
            transition="scale-transition"
            width="40"
        />
        <v-img
            alt="Frog-Jump Logo And Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="250"
            :src="require('../../assets/logo_frog.svg')"
            transition="scale-transition"
            width="250"
        />
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="shrink mt-1 hidden-sm-and-down"
            href="https://www.104.com.tw/company/oe84aqo"
            text
            target="_blank"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon
              color="green darken-4"
              large
          >
            mdi-briefcase-plus
          </v-icon>
        </v-btn>
      </template>
      <span>徵才專區</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            href="http://www.frog-jump.com/"
            text
            target="_blank"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon
              color="green darken-4"
              large
          >
            mdi-home
          </v-icon>
        </v-btn>
      </template>
      <span>德義官網</span>
    </v-tooltip>
  </v-app-bar>
</template>
<script>
export default {
  name: 'AppBar',
  props: {
    drawer: {}
  }
}
</script>