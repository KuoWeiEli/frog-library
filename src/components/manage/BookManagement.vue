<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        sort-by="tech"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>書庫管理</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                New Book
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ headline }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          v-model="editedItem.bookName"
                          label="書刊名"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.bookSeq"
                          label="序號"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.author"
                          label="作者"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.tech"
                          label="技術"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.publisher"
                          label="出版社"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedDateFormatted"
                              label="出版年"
                              v-bind="attrs"
                              v-on="on"
                              readonly
                              hint="出版時間不得小於今日!"
                              persistent-hint
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            :max="maxDate"
                            @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-select
                          v-model="editedItem.status"
                          :items="bookStatusSelect"
                          item-text="label"
                          item-value="value"
                          label="書籍狀態"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
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
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
            x-small
            text
            icon
            class="mr-2"
            color="primary"
            @click="editItem(item)"
        >
          <v-icon small>
            mdi-lead-pencil
          </v-icon>
          編輯
        </v-btn>
      </template>
    </v-data-table>
  </div>


</template>

<script>
import bookService from '@/services/book'

export default {
  name: 'LibraryInfo',
  data: () => ({
    dialog: false,
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '書刊名', value: 'bookName'},
      {text: '序號', value: 'bookSeq'},
      {text: '作者', value: 'author'},
      {text: '技術', value: 'tech'},
      {text: '出版社', value: 'publisher'},
      {text: '出版年', value: 'publishDate'},
      {text: '書籍狀態', value: 'statusDisplay'},
    ],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    // dialog
    date: null,
    maxDate: null,
    menu1: false,
    bookStatus: bookService.bookStatus,
    bookStatusSelect: Object.entries(bookService.bookStatus)
        .map(([key, val]) => {
          return {label: val, value: key}
        })
  }),

  computed: {
    headline() {
      return this.editedIndex === -1 ? 'Add Book' : 'Edit Book'
    },

    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initItem() {
      return {
        bookSeq: '',
        bookName: '',
        author: '',
        tech: '',
        publisher: '',
        publishDate: '',
        status: ''
      }
    },

    initialize() {
      bookService.getAll()
          .then(data => {
            this.items = data
            this.items.forEach(
                item => item.statusDisplay = this.bookStatus[item.status]
            )
          })

      this.defaultItem = this.initItem()
      this.editedItem = this.initItem()

      // dialog minDate
      let tempDate = new Date()
      this.maxDate = tempDate.toISOString().substr(0, 10)
      this.date = this.maxDate
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()

      this.$message({
        type: 'success',
        message: '修改成功!'
      })
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    }
  }
}
</script>

