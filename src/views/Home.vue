<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
            :src="require('../assets/frog_jump_circle.png')"
            class="my-3"
            contain
            height="200"
        />
      </v-col>

      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Frog-Jump Library
        </h1>

        <p class="subheading font-weight-regular">
          Frog-Jump Library 是一個集合愛、勇氣、希望以及由 Frog-Jump 團隊精選出來的線上圖書管理系統。
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4">
        <book-carousels />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import BookCarousels from "@/views/BookCarousels";

export default {
  name: 'Home',

  components: {
    BookCarousels
  }
}
</script>
