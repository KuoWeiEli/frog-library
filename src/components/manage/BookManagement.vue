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
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-btn
                color="primary"
                class="mb-2"
                @click="editItem({})"
            >
              New Book
            </v-btn>
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

    <simple-dialog
        ref="tipDialog"
        persistent
    ></simple-dialog>

    <simple-dialog
        ref="bookDialog"
    >
      <template
          v-slot:default="{ dialog }"
      >
        <book-form
            v-if="dialog"
            :is-manage-mode="true"
            :book="editedItem"
        ></book-form>
      </template>
    </simple-dialog>
  </div>
</template>

<script>
import {Book, bookStatus} from '@/model/book'
import BookService from '@/services/aws/book'
import SimpleToolBar from '@/components/core/SimpleToolBar'
import Msg from '@/services/msg'
import SimpleDialog from '@/components/core/SimpleDialog'
import BookForm from '@/components/book/BookForm'

export default {
  name: 'BookManagement',
  components: {BookForm, SimpleToolBar, SimpleDialog},
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
    editedItem: new Book(),
  }),

  created() {
    this.initialize()
    this.subscribe()
  },

  methods: {
    initialize() {
      BookService.getAll()
          .then(data => {
            data.forEach(this.attachDisplayAttrToBook)
            this.items = data
          })
          .catch(err => Msg.error(Msg.i18N.err_query, err))
    },

    attachDisplayAttrToBook(book) {
      book.statusDisplay = this.bookStatus[book.status]
    },

    editItem(item) {
      this.editedItem = Object.assign(new Book(), item)
      this.$refs.bookDialog
          .open({}, { width: 1000 })
          .then(Function)
          .catch(Function)
    },
    subscribe() {
      BookService.subscribe(
          book => {
            this.attachDisplayAttrToBook(book)
            this.items.push(book)
          },
          book => {
            this.attachDisplayAttrToBook(book)
            let index = this.items.findIndex(item => item.id === book.id)
            Object.assign(this.items[index], book)
          },
          book => {
            let index = this.items.findIndex(item => item.id === book.id)
            this.items.splice(index, 1)
          })
    },
    removeItem(item) {
      this.$refs
          .tipDialog
          .open({
            title: `刪除提醒`,
            msg: `你確定要刪除【${item.name}】這本書？`
          })
          .then(agree => {
            if (agree)
              this.deleteBook(item.id)
          })
          .catch(Function)
    },
    deleteBook(bookID) {
      BookService.deleteBook(bookID)
          .then(() => Msg.success(Msg.i18N.success_delete))
          .catch(err => Msg.error(Msg.i18N.err_delete, err))
    }
  }
}
</script>
