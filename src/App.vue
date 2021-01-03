<template>
  <v-app>
    <navigation :drawer="drawer"/>
    <app-bar :drawer="drawer"/>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Navigation from "@/components/core/Navigation";
import AppBar from "@/components/core/AppBar";

export default {
  name: 'App',
  components: {AppBar, Navigation},
  data: () => ({
    drawer: {
      isOpen: true
    }
  }),
};
</script>