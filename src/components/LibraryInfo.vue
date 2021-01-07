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
                              label="預約時間"
                              hint="預約日期只能選擇三天後!"
                              persistent-hint
                              v-bind="attrs"
                              v-on="on"
                              readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            :min="minDate"
                            @input="menu1 = false"
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
            mdi-calendar-month
          </v-icon>
          預約
        </v-btn>
      </template>
    </v-data-table>
  </div>


</template>

<script>
import libraryService from '@/services/libraryService'

export default {
  name: 'LibraryInfo',
  data: () => ({
    dialog: false,
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '書刊名', value: 'bookName'},
      {text: '作者', value: 'author'},
      {text: '技術', value: 'tech'},
      {text: '狀態', value: 'statusDisplay'},
      {text: '預約人數', value: 'waitNum'},
    ],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    // reservation dialog
    date: null,
    minDate: null,
    menu1: false,

  }),

  computed: {
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
        bookName: '',
        author: '',
        tech: '',
        bookStatus: '',
        waitNum: 0,
      }
    },

    async initialize() {
      libraryService.getAll()
          .then(data => this.items = data)

      this.defaultItem = this.initItem()
      this.editedItem = this.initItem()

      // dialog minDate
      let tempDate = new Date()
      tempDate.setDate(tempDate.getDate() + 4)
      this.minDate = tempDate.toISOString().substr(0, 10)
      this.date = this.minDate
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

      //test
      this.editedItem.applicant = '0400-黃國維'
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
        message: '預約成功!'
      })
    },


    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}/${month}/${day}`
    }
  }
}
</script>

