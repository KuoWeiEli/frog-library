<template>
  <!--  <hello-world />-->
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
        <h1 class="display-1 font-weight-bold mb-3 text-center">
          新書入庫
        </h1>

        <v-carousel
            cycle
            height="450"
            hide-delimiter-background
            show-arrows-on-hover
        >
          <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
          >
            <v-sheet
                color="white"
                height="100%"
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
              >
                <v-col
                    cols="12"
                    lg="4"
                >
                  <v-img
                      :src="item.url"
                      class="my-3"
                      contain
                      height="400"
                  />
                </v-col>
                <v-col
                    cols="12"
                    lg="4"
                >
                  <h2 class="headline font-weight-bold mb-3 black--text">
                    {{item.bookName}}
                  </h2>
                  <p class="black--text">
                    <span class="font-weight-bold">作者：</span> {{item.author}}
                    <br>
                    <span class="font-weight-bold">技術：</span> {{item.tech}}
                    <br>
                    <span class="font-weight-bold">出版社：</span> {{item.publisher}}
                    <br>
                    <span class="font-weight-bold">出版年：</span> {{item.publishDate}}
                  </p>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

import axios from "axios";

export default {
  name: 'Home',

  components: {
    // HelloWorld,
  },
  created() {
    this.initialize()
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async initialize() {
      axios.get('http://localhost:3000/books?createDate=2020/12/28')
          .then(response => {
            this.items = response.data
          })
    }
  }
}
</script>
<style>

</style>
