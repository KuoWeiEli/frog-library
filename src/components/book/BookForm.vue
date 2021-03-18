<template>
  <v-card
      :loading="card.loading"
      :disabled="card.disabled"
  >
    <v-card-title>
      <span class="headline">{{ cardTitle }}</span>
    </v-card-title>

    <div class="d-sm-flex flex-sm-nowrap justify-sm-space-between">
      <v-img
          v-if="coverImg"
          contain :src="coverImg"
          @load="coverLoaded"
      ></v-img>
      <div>
        <v-card-text>
          <v-container>
            <v-form
                ref="bookForm"
                @submit.prevent="save"
                v-model="valid"
                lazy-validation
                :readonly="!isManageMode"
            >
              <v-row>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      v-model="form.name"
                      :rules="rules.name"
                      label="書刊名"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      v-model="form.author"
                      :rules="rules.author"
                      label="作者"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      v-model="form.tech"
                      :rules="rules.tech"
                      label="技術"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      v-model="form.publisher"
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
                      :disabled="!isManageMode"
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
                        v-model="form.publishDate"
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
                      v-model="form.status"
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
                      :disabled="!isManageMode"
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
                        v-model="form.createDate"
                        no-title
                        @input="createDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                    v-show="isManageMode"
                    cols="12"
                >
                  <img-file
                      v-model="form.cover"
                      :show-size="cover.showSize"
                      :counter="cover.counter"
                      :accept="cover.accept"
                      :rules="cover.rules"
                      :label="cover.label"
                      @upload="upload"
                  ></img-file>
                </v-col>
                <v-btn
                    type="submit"
                    v-show="false"
                ></v-btn>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </div>
    </div>
    <v-card-actions v-show="isManageMode">
      <v-spacer></v-spacer>

      <slot name="action">
        <v-btn
            color="blue darken-1"
            text
            @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
          Save
        </v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>
<script>
import ImgFile from '@/components/form/element/ImgFile'
import {Book, bookStatus} from '@/model/book'
import format from '@/services/format'
import BookService from '@/services/aws/book'
import Msg from '@/services/msg'

export default {
  name: 'BookForm',
  components: {ImgFile},
  inject: ['agree', 'cancel'],
  props: {
    book: Book,
    // 是否為管理員模式
    isManageMode: {
      type: Boolean,
      default: false
    }
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
    form: new Book(),
    rules: {
      name: [v => !!v || 'book name is required!'],
      author: [v => !!v || 'book author is required!'],
      tech: [v => !!v || 'book tech is required!'],
      publisher: [v => !!v || 'book publisher is required!'],
      publishDate: [v => !!v || 'book publishDate is required!'],
      status: [v => !!v || 'book status is required!'],
      createDate: [v => !!v || 'book createDate is required!']
    },
    card: {
      loading: false,
      disabled: false
    },
    coverImg: null,
  }),
  created() {
    Object.assign(this.form, this.book)
    this.loadBookCover()

  },

  computed: {
    cardTitle() {
      return !this.isManageMode ? 'Book Detail' : this.form.id ? 'Edit Book' : 'Add Book'
    },

    publishDateFormatted() {
      return format.formatDate(this.form.publishDate)
    },

    createDateFormatted() {
      return format.formatDate(this.form.createDate)
    },

    cover() {
      let coverChanged = this.form.coverChanged
          // 新增時需要檢核，編輯時如果有另外上傳封面才需要檢核了
          || !(this.form.id)
      let name = this.form.name

      return {
        accept: coverChanged ? 'image/png, image/jpeg, image/bmp' : '',
        rules: coverChanged ? [
          v => !!v || 'book cover is required!',
          v => !v || v.size < (500 * 1024) || `cover size should be less than 500KB!`,
        ] : [() => true],
        counter: coverChanged,
        showSize: coverChanged,
        label: coverChanged ? '書籍封面' : name
      }
    }
  },
  methods: {
    upload(imgFileUrl) {
      // coverChanged 初始值為 false，一旦經過上傳，將會變為 true
      this.form.coverChanged = true
      this.card.loading = true
      this.coverImg = imgFileUrl
    },

    coverLoaded() {
      this.card.loading = false
    },

    save() {
      if (!this.$refs.bookForm.validate()) return

      const method = this.form.id ? 'updateBook' : 'createBook'

      this.card.loading = true
      this.card.disabled = true

      BookService[method](Object.assign(new Book(), this.form))
          .then(() => {
            Msg.success(Msg.i18N.success_book_save)
            this.agree()
          })
          .catch(err => Msg.error(Msg.i18N.err_book_save, err))
          .finally(() => {
            this.card.loading = false
            this.card.disabled = false
          })
    },
    /** 查詢/編輯時，讀取書籍封面 **/
    loadBookCover() {
      if (!this.form.id) return

      // 作為 cover 是否有變動的 flag
      this.form.coverChanged = false
      this.card.loading = true
      // book cover in s3 use the bookID as the file key
      BookService.getBookCover(this.form.id)
          .then(url => this.coverImg = url)
          .catch(err => Msg.error(Msg.i18N.err_book_cover_load, err))
    }
  }
}
</script>