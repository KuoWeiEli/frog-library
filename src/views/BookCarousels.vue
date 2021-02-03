<template>
  <div>
    <v-row
        class="fill-height"
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          lg="8"
      >
        <h1 class="display-1 font-weight-bold mb-3 text-center">
          新書入庫
        </h1>
        <v-carousel
            cycle
            light
            height="420"
            hide-delimiter-background
            show-arrows-on-hover
        >
          <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
          >
            <v-card>
              <div class="d-flex flex-no-wrap justify-start">
                <v-avatar
                    class="ma-3"
                    size="400"
                    tile
                >
                  <v-img contain :src="item.coverUrl"></v-img>
                </v-avatar>

                <div>
                  <v-card-title>
                    <span class="headline">{{ item.name }}</span>
                  </v-card-title>

                  <v-card-subtitle>
                    <v-list>
                      <v-list-item
                          v-for="intro in item.introduce"
                          :key="intro.value"
                      >
                        <v-list-item-icon>
                          <v-icon>{{ intro.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ intro.label }}</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                          {{ intro.value }}
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import bookService from '@/services/aws/book'

export default {
  name: 'BookCarousels',
  created() {
    this.initialize()
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    initialize() {
      bookService.getBooksForCarousels()
          .then(data => {
            this.items = data
            this.getIntro(this.items)
          })
          .catch(err => this.$message({type: 'error', message: `loading book happened error: + ${err}`}))
    },
    getIntro(items) {
      items.forEach(item => {
        item.introduce = [
          {label: '作者', icon: 'mdi-human-edit', value: item.author},
          {label: '出版社', icon: 'mdi-home-city-outline', value: item.publisher},
          {label: '出版日', icon: 'mdi-calendar', value: item.publishDate},
          {label: '技術', icon: 'mdi-electron-framework', value: item.tech},
        ]
      })
    }
  }
}
</script>
