<template>
  <div>
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
                {{ item.bookName }}
              </h2>
              <p class="black--text">
                <span class="font-weight-bold">作者：</span> {{ item.author }}
                <br>
                <span class="font-weight-bold">技術：</span> {{ item.tech }}
                <br>
                <span class="font-weight-bold">出版社：</span> {{ item.publisher }}
                <br>
                <span class="font-weight-bold">出版年：</span> {{ item.publishDate }}
              </p>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'BookCarousels',
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
