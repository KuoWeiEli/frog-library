<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :sort-by="['createDate', 'name']"
        :sort-desc="[true, false]"
        class="elevation-1"
        :search="search"
        multi-sort
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>館藏資訊</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.statusDisplay="{ item }">
        <!-- 破損或遺失皆不可借閱-->
        {{ item.statusDisplay = bookCurrStatus[/[BL]/.test(item.status) ? 'E' : 'N'] }}
      </template>

      <template v-slot:item.waitNum="{ item }">
        {{ item.reservations ? item.reservations.length : 0 }}
      </template>
      <template v-slot:item.waitQueue="{ item }">
        <v-chip
            v-for="reservation in item.reservations"
            :key="reservation.id"
        >
          <v-avatar left>
            <v-img :src="reservation.user.userAvatar"></v-img>
          </v-avatar>
          {{ reservation.user.nameTW }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
            v-show="enabledReservation"
            x-small
            text
            icon
            class="mr-2"
            color="primary"
            @click="editItem(item)"
        >
          <v-icon small>
            mdi-calendar-month
          </v-icon>
          預約
        </v-btn>
      </template>
    </v-data-table>

    <simple-dialog
        ref="dialog"
    >
      <template
          v-slot:default="{ dialog }"
      >
        <reservation-form
            v-if="dialog"
            :reservation="editedItem"
        ></reservation-form>
      </template>
    </simple-dialog>

    <simple-dialog ref="tipDialog" persistent></simple-dialog>
  </div>
</template>

<script>
import BookService from '@/services/aws/book'
import ReservationService from '@/services/aws/reservation'
import UserService from '@/services/aws/user'
import {Book, bookCurrStatus} from '@/model/book'
import {User} from '@/model/user'
import Msg from '@/services/msg'
import ReservationForm from '@/components/form/ReservationForm'
import SimpleDialog from '@/components/core/SimpleDialog'
import {Reservation, isPendding} from '@/model/reservation'
import instruction from '@/assets/doc/reservation_instructions'

export default {
  name: 'LibraryInfo',
  components: {ReservationForm, SimpleDialog},
  data: () => ({
    search: '',
    headers: [
      {text: '操作', value: 'actions', sortable: false, filterable: false},
      {text: '入庫時間', value: 'createDate'},
      {text: '書刊名', value: 'name'},
      {text: '作者', value: 'author'},
      {text: '技術', value: 'tech'},
      {text: '狀態', value: 'statusDisplay'},
      {text: '預約人數', value: 'waitNum'},
      {text: '等候佇列', value: 'waitQueue'}
    ],
    items: [],
    editedItem: new Reservation(),
    bookCurrStatus: bookCurrStatus
  }),
  computed: {
    /** 如果使用者已有預約，且狀態為下列三點其中一點「待審核」、「待取書」、「待歸還」，則不可以預約。未登入者不可預約 **/
    enabledReservation() {
      let id = this.$store.state.user.id
      let hasReservation = false
      if (this.items) {
        let userIDs = this.items.map(each => each.reservations)
                  .reduce((a, b) => a.concat(b), [])
                  .filter(Boolean)
                  .map(reservation => reservation.userID)
        hasReservation = userIDs.includes(id)
      }

      return !!id && !hasReservation
    }
  },

  created() {
    this.initialize()
    this.subscribe()
  },

  methods: {
    getRelatedMap: function (reservations) {
      let bookReservationMap = {}
      let userAvatarMap = {}

      reservations.forEach(each => {
        // 等待佇列只包含預約狀態為「待審核」、「待取書」、「待歸還」
        if (isPendding(each.status)) {
          // 將 reservations 集合變成 Map<BookID, Reservations> 的形式
          let bookID = each.bookID
          if (!bookReservationMap[bookID])
            bookReservationMap[bookID] = []
          bookReservationMap[bookID].push(each)

          // 處理 User Avatar，使成 Map<userID, avatarUrl> 形式
          let userID = each.userID
          if (!userAvatarMap[userID])
            userAvatarMap[userID] = null
        }
      })

      return new Promise((resolve, reject) => {
        let userIDs = Object.keys(userAvatarMap)
        Promise.all(userIDs.map(UserService.getUserAvatar))
            .then(urls => {
              userIDs.forEach((userID, index) => {
                userAvatarMap[userID] = urls[index]
              })
              resolve({bookReservationMap, userAvatarMap})
            })
            .catch(err => {
              Msg.error(Msg.i18N.err_query, err)
              reject()
            })
      })
    },
    initialize() {
      Promise.all([BookService.getAll(), ReservationService.getAll()])
          .then(([books, reservations]) => {

            this.getRelatedMap(reservations)
                .then(({bookReservationMap, userAvatarMap}) => {
                  // books
                  this.items = books
                  this.items.forEach(book => {
                    // 依照 bookReservationMap 取得該 book 的預約陣列
                    book.reservations = bookReservationMap[book.id]
                    // 如果該書有預約紀錄，依照 userAvatarMap 取得該 user 的大頭貼 Url
                    if (book.reservations)
                      book.reservations
                          .forEach(each => {
                            each.user.userAvatar = userAvatarMap[each.userID]
                          })
                  })
                });
          })
          .catch(err => {
            Msg.error(Msg.i18N.err_query, err)
          })
    },

    editItem(item) {
      this.$refs.tipDialog
          .open({
            title: '預約注意事項',
            msg: instruction
          },{ width: 800 })
          .then(agree => {
            if (agree)
              this.reserve(item)
          })
          .catch(() => {})
    },

    reserve(item) {
      this.editedItem.book = Object.assign(new Book(), item)
      this.editedItem.bookID = this.editedItem.book.id
      this.editedItem.user = Object.assign(new User(), this.$store.state.user)
      this.editedItem.userID = this.editedItem.user.id

      this.$refs
          .dialog
          .open({}, {width: 800})
          .then(Function)
          .catch(Function)
    },

    getBook: function (bookID) {
      let bookIndex = this.items.findIndex(item => item.id === bookID)
      let book = this.items[bookIndex];
      return book
    },

    subscribe() {
      BookService.subscribe(
          book => this.items.push(book),
          book => {
            let index = this.items.findIndex(item => item.id === book.id)
            Object.assign(this.items[index], book)
          },
          book => {
            let index = this.items.findIndex(item => item.id === book.id)
            this.items.splice(index, 1)
          })

      ReservationService.subscribe(
          reservation => {
            UserService.getUserAvatar(reservation.userID)
                .then(url => {
                  reservation.user.userAvatar = url

                  let book = this.getBook(reservation.bookID)
                  if (!book.reservations)
                    book.reservations = []
                  book.reservations.push(reservation)
                })
                .catch(err => {
                  Msg.error(Msg.i18N.err_query, err)
                })
          },
          reservation => {
            let book = this.getBook(reservation.bookID)
            let reservationIndex = book.reservations.findIndex(item => item.id === reservation.id)
            Object.assign(book.reservations[reservationIndex], reservation)
          },
          reservation => {
            let book = this.getBook(reservation.bookID);
            let reservationIndex = book.reservations.findIndex(item => item.id === reservation.id)
            book.reservations.splice(reservationIndex, 1)
          }
      )
    },
  }
}
</script>

