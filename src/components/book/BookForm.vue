<template>
  <v-form
      ref="bookForm"
      v-model="valid"
      lazy-validation
  >
    <v-row>
      <v-col
          cols="12"
      >
        <v-text-field
            v-model="editedItem.name"
            :rules="rules.name"
            label="書刊名"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-text-field
            v-model="editedItem.author"
            :rules="rules.author"
            label="作者"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-text-field
            v-model="editedItem.tech"
            :rules="rules.tech"
            label="技術"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-text-field
            v-model="editedItem.publisher"
            :rules="rules.publisher"
            label="出版社"
        ></v-text-field>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-menu
            ref="publishDateMenu"
            v-model="publishDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="publishDateFormatted"
                :rules="rules.publishDate"
                label="出版年"
                v-bind="attrs"
                v-on="on"
                readonly
                hint="出版時間不得大於今日!"
                persistent-hint
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="editedItem.publishDate"
              no-title
              :max="maxDate"
              @input="publishDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-select
            v-model="editedItem.status"
            :rules="rules.status"
            :items="bookStatusSelect"
            item-text="label"
            item-value="value"
            label="書籍狀態"
        ></v-select>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-menu
            ref="createDateMenu"
            v-model="createDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="createDateFormatted"
                :rules="rules.createDate"
                label="入庫時間"
                v-bind="attrs"
                v-on="on"
                readonly
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="editedItem.createDate"
              no-title
              @input="createDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col
          cols="12"
      >
        <template>
          <v-file-input
              v-model="editedItem.cover"
              :show-size="cover.showSize"
              :counter="cover.counter"
              :accept="cover.accept"
              :rules="cover.rules"
              :label="cover.label"
              @change="upload"
          >
          </v-file-input>
        </template>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { bookStatus } from '@/model/book'
import format from '@/services/format'

export default {
  name: 'BookForm',
  props: {
    editedItem: {},
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    publishDateMenu: false,
    createDateMenu: false,
    bookStatusSelect: Object.entries(bookStatus)
        .map(([key, val]) => {
          return {label: val, value: key}
        }),

    valid: true,
    rules: {
      name: [v => !!v || 'book name is required!'],
      author: [v => !!v || 'book author is required!'],
      tech: [v => !!v || 'book tech is required!'],
      publisher: [v => !!v || 'book publisher is required!'],
      publishDate: [v => !!v || 'book publishDate is required!'],
      status: [v => !!v || 'book status is required!'],
      createDate: [v => !!v || 'book createDate is required!']
    }
  }),

  computed: {
    publishDateFormatted() {
      return format.formatDate(this.editedItem.publishDate)
    },

    createDateFormatted() {
      return format.formatDate(this.editedItem.createDate)
    },

    cover() {
      let coverChanged = this.editedItem.coverChanged
          // 新增時需要檢核，編輯時如果有另外上傳封面才需要檢核了
          || !(this.editedItem.id)
      let name = this.editedItem.name

      return {
        accept: coverChanged ? 'image/png, image/jpeg, image/bmp': '',
        rules: coverChanged ? [
          v => !!v || 'book cover is required!',
          v => !v || v.size < (500 * 1024) || `cover size should be less than 500KB!`,
        ]: [() => true] ,
        counter: coverChanged,
        showSize: coverChanged,
        label: coverChanged ? '書籍封面': name
      }
    }
  },
  methods: {
    upload() {
      // coverChanged 初始值為 false，一旦經過上傳，將會變為 true
      this.editedItem.coverChanged = true
      let vm = this

      if (this.editedItem.cover) {
        // 實現預覽圖片功能
        let reader = new FileReader()
        reader.onload = function(event) { // 當 reader 讀取完成後，會觸發 onload event，此時將 read 後的 url emit
          vm.$emit('coverUpload', event.target.result)
        }

        reader.readAsDataURL(this.editedItem.cover)
      } else {
        vm.$emit('coverUpload', null)
      }
    }
  }
}
</script>