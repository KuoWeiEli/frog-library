<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        sort-by="applyDate"
        :sort-desc="true"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>預約管理</v-toolbar-title>
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
                New Reservation
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Reservation</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          readonly
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
                          readonly
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
                          readonly
                          v-model="editedItem.applicant"
                          label="申請人"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu1"
                          v-model="menu.reservationDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedReservationDate"
                              label="預約時間"
                              hint="預約日期只能選擇三天後!"
                              persistent-hint
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.reservationDate"
                            no-title
                            @input="menu.reservationDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu1"
                          v-model="menu.dueDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedDueDate"
                              label="到期時間"
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.dueDate"
                            no-title
                            @input="menu.dueDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu3"
                          v-model="menu.applyDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedApplyDate"
                              label="申請時間"
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.applyDate"
                            no-title
                            @input="menu.applyDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu4"
                          v-model="menu.verifyDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedVerifyDate"
                              label="審核時間"
                              v-bind="attrs"
                              v-on="on"
                              readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.verifyDate"
                            no-title
                            @input="menu.verifyDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu5"
                          v-model="menu.takeDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedTakeDate"
                              label="取書時間"
                              v-bind="attrs"
                              v-on="on"
                              readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.takeDate"
                            no-title
                            @input="menu.takeDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="6"
                    >
                      <v-menu
                          ref="menu6"
                          v-model="menu.returnDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedReturnDate"
                              label="歸還時間"
                              v-bind="attrs"
                              v-on="on"
                              readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.returnDate"
                            no-title
                            @input="menu.returnDate = false"
                        ></v-date-picker>
                      </v-menu>
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
            {{ item.editable? 'mdi-lead-pencil': 'mdi-magnify' }}
          </v-icon>
          {{ item.editable? '編輯': '查看' }}
        </v-btn>
      </template>
    </v-data-table>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: 'ReservationManagement',
  data: () => ({
    dialog: false,
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '預約狀態', value: 'statusTW'},
      {text: '申請人', value: 'applicant'},
      {text: '申請時間', value: 'applyDate'},
      {text: '書刊名', value: 'bookName'},
      {text: '預約起日', value: 'reservationDate'},
      {text: '到期時間', value: 'dueDate'},
      {text: '審核時間', value: 'verifyDate'},
      {text: '取書時間', value: 'takeDate'},
      {text: '歸還時間', value: 'returnDate'},
    ],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    // reservation dialog
    menu: {
      applyDate: false,
      reservationDate: false,
      dueDate: false,
      verifyDate: false,
      takeDate: false,
      returnDate: false
    }
  }),

  computed: {
    computedDateFormatted(date) {
      return this.formatDate(date)
    },

    computedApplyDate() {
      return this.formatDate(this.editedItem.applyDate)
    },

    computedReservationDate() {
      return this.formatDate(this.editedItem.reservationDate)
    },

    computedDueDate() {
      return this.formatDate(this.editedItem.dueDate)
    },

    computedVerifyDate() {
      return this.formatDate(this.editedItem.verifyDate)
    },

    computedTakeDate() {
      return this.formatDate(this.editedItem.takeDate)
    },

    computedReturnDate() {
      return this.formatDate(this.editedItem.returnDate)
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
        status: '',
        empId: '',
        empName: '',
        applyDate: {},
        bookName: '',
        reservationDate: {},
        dueDate: {},
        verifyDate: {},
        takeDate: {},
        returnDate: {},
        // display func
        statusTW: '',
        applicant: '',
        editable: false
      }
    },

    getItems: function () {
      const statusMap = {
        E: '已歸還',
        D: '已拒絕',
        T: '已逾時',
        C: '已取消',
        2: '待審核',
        3: '待取書',
        4: '待歸還'
      }
      return new Promise(resolve => {
        axios.get('http://localhost:3000/reservations')
            .then(response => {
              this.items = response.data
              // display func

              this.items.forEach(e => {
                e.statusTW = statusMap[e.status]
                e.applicant = e.empId + '-' + e.empName
                e.editable = /[234]/.test(e.status)
              })
              resolve()
            })
      })
    },

    async initialize() {
      await this.getItems()

      this.defaultItem = this.initItem()
      this.editedItem = this.initItem()
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

      //test
      this.editedItem.applicant = '0400-黃國維'
      this.editedItem.applyDate = this.formatDate(this.editedItem.applyDate, '/', '-')
      this.editedItem.reservationDate = this.formatDate(this.editedItem.reservationDate, '/', '-')
      this.editedItem.dueDate = this.formatDate(this.editedItem.dueDate, '/', '-')
      this.editedItem.verifyDate = this.formatDate(this.editedItem.verifyDate, '/', '-')
      this.editedItem.takeDate = this.formatDate(this.editedItem.takeDate, '/', '-')
      this.editedItem.returnDate = this.formatDate(this.editedItem.returnDate, '/', '-')
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


    formatDate(date, fromSeparator= '-', toSeparator= '/') {
      if (!date) return null

      const [year, month, day] = date.split(fromSeparator)
      return year + toSeparator + month + toSeparator + day
    }
  }
}
</script>

