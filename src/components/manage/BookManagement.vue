<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :sort-by="['createDate', 'name']"
        :sort-desc="[true, false]"
        class="elevation-1"
        multi-sort
    >
      <template v-slot:top>
        <simple-tool-bar
          title="書庫管理"
          v-model="search"
        >
          <template v-slot:append>
            <basic-dialog :dialog="dialog">
              <basic-card :title="dialogTitle" :loading="isCardLoading" :disabled="isCardDisabled" @save="save"
                          @close="close">
                <book-form ref="form" :edited-item="editedItem" @coverUpload="coverUpload"/>
                <template v-slot:prepend>
                  <v-avatar
                      v-if="cover"
                      class="ma-3"
                      size="400"
                      tile
                  >
                    <v-img contain :src="cover" @load="coverLoaded"></v-img>
                  </v-avatar>
                </template>
              </basic-card>
            </basic-dialog>
          </template>
        </simple-tool-bar>
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
        <v-spacer></v-spacer>
        <v-btn
            x-small
            text
            icon
            class="mr-2"
            color="error"
            @click="removeItem(item)"
        >
          <v-icon small>
            mdi-trash-can-outline
          </v-icon>
          刪除
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {Book, bookStatus} from '@/model/book'
import bookService from '@/services/aws/book'
import BasicDialog from '@/components/core/BasicDialog'
import BookForm from '@/components/book/BookForm'
import BasicCard from '@/components/core/BasicCard'
import SimpleToolBar from '@/components/core/SimpleToolBar'

export default {
  name: 'BookManagement',
  components: {BasicDialog, BookForm, BasicCard, SimpleToolBar},
  data: () => ({
    search: '',
    headers: [
      {text: '操作', value: 'actions', sortable: false, filterable: false},
      {text: '書刊名', value: 'name'},
      {text: '作者', value: 'author'},
      {text: '技術', value: 'tech'},
      {text: '出版社', value: 'publisher'},
      {text: '出版年', value: 'publishDate'},
      {text: '入庫時間', value: 'createDate'},
      {text: '書籍狀態', value: 'statusDisplay'},
    ],
    bookStatus: bookStatus,
    items: [],
    editedIndex: -1,
    editedItem: new Book(),
    dialog: {
      visible: false,
      maxWidth: '1000px',
      activator: 'New Book'
    },
    cover: null,
    // card prop
    isCardLoading: false,
    isCardDisabled: false
  }),

  computed: {
    dialogTitle() {
      return this.editedIndex === -1 ? 'Add Book' : 'Edit Book'
    }
  },

  created() {
    this.initialize()
    this.subscribe()
  },

  methods: {
    initialize() {
      bookService.getAll()
          .then(data => {
            this.items = data
            this.items.forEach(
                item => {
                  item.statusDisplay = this.bookStatus[item.status]
                }
            )
          })
          .catch(err => {
            this.$message({type: 'error', message: `error happened:  ${err}`})
          })
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)

      // 作為 cover 是否有變動的 flag
      this.editedItem.coverChanged = false
      this.isCardLoading = true
      // book cover in s3 use the bookID as the file key
      bookService.getBookCover(this.editedItem.id)
          .then(url => {
            this.cover = url
          })
          .catch(err => {
            this.$message({type: 'error', message: `load book's cover happened error:  ${err}`})
          })
      this.dialog.visible = true
    },

    close() {
      this.dialog.visible = false
      this.$refs.form.$refs.bookForm.resetValidation()

      this.$nextTick(() => {
        this.editedItem = new Book()
        this.editedIndex = -1
        this.cover = null
        this.isCardLoading = false
        this.isCardDisabled = false
      })
    },

    save() {
      if (!this.$refs.form.$refs.bookForm.validate()) return

      const isAdding = this.editedIndex === -1
      const msg = isAdding ? 'adding' : 'updating'
      const method = isAdding ? 'createBook' : 'updateBook'

      this.isCardLoading = true
      this.isCardDisabled = true

      bookService[method](Object.assign({}, this.editedItem))
          .then(() => {
            this.$message({
              type: 'success', message: `Success ${msg} book!`
            })

            this.close()
          })
          .catch(error => {
            this.isCardLoading = false
            this.isCardDisabled = false

            this.$message({type: 'error', message: `Error ${msg} book: + ${error}`})
          })
    },
    // cover upload 事件
    coverUpload(event) {
      this.isCardLoading = true
      this.cover = event
    },
    coverLoaded() {
      this.isCardLoading = false
    },
    subscribe() {
      bookService.subscribe(
          book => this.items.push(book),
          book => {
            let index = this.items.findIndex(item => item.id === book.id)
            Object.assign(this.items[index], book)
          },
          book => {
            let index = this.items.findIndex(item => item.id === book.id)
            this.items.splice(index, 1)
          })
    },
    removeItem(item) {
      this.$confirm(`Do you want to remove the book,【${item.name}】?`)
          .then(() => {
            bookService.deleteBook(item.id)
                .then(() => this.$message({
                  type: 'success', message: `Successfully delete book, 【${item.name}】`
                }))
                .catch(err => this.$message({
                  type: 'error', message: `delete book【${item.name} failed, error: ${err}】`
                }))
          })
    }
  }
}
</script>
