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
          <v-toolbar-title>館藏資訊</v-toolbar-title>
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
            <!--            <template v-slot:activator="{ on, attrs }">-->
            <!--              <v-btn-->
            <!--                  color="primary"-->
            <!--                  dark-->
            <!--                  class="mb-2"-->
            <!--                  v-bind="attrs"-->
            <!--                  v-on="on"-->
            <!--              >-->
            <!--                New Reservation-->
            <!--              </v-btn>-->
            <!--            </template>-->
            <reservation-form
                v-if="dialog"
                :book="editedItem"
                :user="user"
                @success="closeDialog"
                @cancel="closeDialog"
            ></reservation-form>
          </v-dialog>
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

export default {
  name: 'LibraryInfo',
  components: {ReservationForm},
  data: () => ({
    dialog: false,
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '書刊名', value: 'name'},
      {text: '作者', value: 'author'},
      {text: '技術', value: 'tech'},
      {text: '狀態', value: 'statusDisplay'},
      {text: '預約人數', value: 'waitNum'},
      {text: '等候佇列', value: 'waitQueue'}
    ],
    items: [],
    editedItem: new Book(),
    user: new User(),
    bookCurrStatus: bookCurrStatus
  }),


  // watch: {
  //   dialog(val) {
  //     val || this.close()
  //   }
  // },

  created() {
    this.initialize()
    this.subscribe()
  },

  methods: {
    getRelatedMap: function (reservations) {
      let bookReservationMap = {}
      let userAvatarMap = {}

      reservations.forEach(each => {
        // 將 reservations 集合變成 Map<BookID, Reservations> 的形式
        let bookID = each.bookID
        if (!bookReservationMap[bookID])
          bookReservationMap[bookID] = []
        bookReservationMap[bookID].push(each)

        // 處理 User Avatar，使成 Map<userID, avatarUrl> 形式
        let userID = each.userID
        if (!userAvatarMap[userID])
          userAvatarMap[userID] = null
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
    }, initialize() {
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
      this.editedItem = Object.assign(new Book(), item)
      this.user = this.$store.state.user
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },

    getBook: function (bookID) {
      let bookIndex = this.items.findIndex(item => item.id === bookID)
      let book = this.items[bookIndex];
      return book;
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

