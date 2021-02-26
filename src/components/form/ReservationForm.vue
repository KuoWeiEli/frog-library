<template>
  <v-card
      :loading="card.loading"
      :disabled="card.disabled">
    <v-card-title>
      <span class="headline">Reservation</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form
            @submit.prevent="save"
            ref="reservationForm"
            v-model="valid"
            lazy-validation
        >
          <v-row>
            <v-col
                cols="12"
            >
              <v-text-field
                  readonly
                  v-model="book.name"
                  :rules="rules.book"
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
                  v-model="book.author"
                  :rules="rules.book"
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
                  v-model="applicant"
                  :rules="rules.user"
                  label="申請人"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                lg="6"
            >
              <v-menu
                  ref="reservationDateMenu"
                  v-model="calendar.reservationDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="reservationDateFormatted"
                      label="預約時間"
                      hint="預約日期只能選擇三天後！"
                      :rules="rules.reservation"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                      readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="calendar.value"
                    range
                    no-title
                    scrollable
                    :min="calendar.reservationMinDate"
                    :max="reservationMaxDate"
                    @input="reservationDateInput"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="calendar.reservationDateMenu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.reservationDateMenu.save(calendar.value)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-btn
                type="submit"
                v-show="false"
            ></v-btn>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="blue darken-1"
          text
          @click="$emit('cancel')"
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
</template>

<script>
import format from '@/services/format'
import Msg from '@/services/msg'
import {Book} from '@/model/book'
import {User} from '@/model/user'
import {Reservation} from '@/model/reservation'
import ReservationService from '@/services/aws/reservation'

export default {
  name: 'ReservationForm',
  props: {
    book: Book,
    user: User
  },
  data: () => ({
    calendar: {
      reservationMinDate: null,
      reservationDateMenu: false,
      value: []
    },
    valid: true,
    form: new Reservation(),
    rules: {
      book: [v => !!v || '必須指定預約書籍！'],
      user: [v => !!v || '無使用者資訊！'],
      reservation: [
        v => !!v || '請選擇預約時間！',
        v => !v || v.includes('~') || '無完整預約時段！請選擇預約「起日」與「訖日」兩個日期！'
      ]
    },
    card: {
      loading: false,
      disabled: false
    }
  }),
  created() {
    // 預約日期只能選擇三天後
    let tempDate = new Date()
    tempDate.setDate(tempDate.getDate() + 4)
    this.calendar.reservationMinDate = tempDate.toISOString().substr(0, 10)
  },
  computed: {
    reservationMaxDate() {
      if (this.calendar.value.length > 0) {
        let [start] = this.calendar.value
        // 預約 MAX 日期同到期時間，為預約日期往後 30 天
        let tempDate = new Date(start)
        tempDate.setDate(tempDate.getDate() + 30)
        return tempDate.toISOString().substr(0, 10)
      }
      return null
    },
    reservationDateFormatted() {
      return this.calendar.value.map(format.formatDate).join(' ~ ')
    },
    applicant() {
      return this.user.empid + `-` + this.user.nameTW
    }
  },
  methods: {
    reservationDateInput() {
      this.calendar.value.sort()
    },
    processData() {
      let [start, end] = this.calendar.value

      this.form.reservationDate = start
      this.form.dueDate = end
      this.form.applyDate = new Date().toISOString().substr(0, 10)
      this.form.status = '2'  // Ref reservationStatus['2'] 待審核
      this.form.userID = this.user.id
      this.form.bookID = this.book.id
    },
    save() {
      if (!this.$refs.reservationForm.validate()) return

      this.card.loading = true
      this.card.disabled = true

      this.processData()
      ReservationService.createReservation(this.form)
          .then(() => {
            Msg.success(Msg.i18N.success_reservation)
            this.$emit('success')
          })
          .catch(err => Msg.error(Msg.i18N.err_reservation, err))
          .finally(() => {
            this.card.loading = false
            this.card.disabled = false
          })
    },
  }
}
</script>

