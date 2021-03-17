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
                  v-model="reservation.book.name"
                  :rules="rules.book"
                  label="書刊名"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="8"
            >
              <v-text-field
                  readonly
                  v-model="reservation.book.author"
                  :rules="rules.book"
                  label="作者"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
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
                      :hint="isManageMode? '預約日期不可在使用者申請時間之前': '預約日期只能選擇三天後，日期不可選擇在等待佇列中的預約時段！'"
                      :rules="rules.reservation"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                      readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="calendar.reservationDate"
                    range
                    no-title
                    scrollable
                    :min="calendar.reservationMinDate"
                    :max="reservationMaxDate"
                    :allowed-dates="allowReservationDates"
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
                      @click="$refs.reservationDateMenu.save(calendar.reservationDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col
                v-if="isManageMode"
                cols="12"
                lg="6"
            >
              <v-menu
                  ref="verifyDateMenu"
                  v-model="calendar.verifyDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="verifyDateFormatted"
                      label="審核時間"
                      hint="審核時間只能在申請時間與取書時間之間"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                      readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="form.verifyDate"
                    no-title
                    :min="calendar.verifyDateMinDate"
                    :max="verifyMaxDate"
                    @input="calendar.verifyDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
                v-if="isManageMode"
                cols="12"
                lg="6"
            >
              <v-menu
                  ref="takeDateMenu"
                  v-model="calendar.takeDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="takeDateFormatted"
                      label="取書時間"
                      hint="取書時間只能在審核時間與歸還時間之間"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                      readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="form.takeDate"
                    no-title
                    :min="takeMinDate"
                    :max="takeMaxDate"
                    @input="calendar.takeDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
                v-if="isManageMode"
                cols="12"
                lg="6"
            >
              <v-menu
                  ref="returnDateMenu"
                  v-model="calendar.returnDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                  :disabled="!form.takeDate"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="returnDateFormatted"
                      label="歸還時間"
                      hint="歸還時間只能在取書時間之後（含）"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                      readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="form.returnDate"
                    no-title
                    :min="returnMinDate"
                    @input="calendar.returnDateMenu = false"
                ></v-date-picker>
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

    <!-- 當為管理者模式，查看預約時，隱藏動作列 -->
    <v-card-actions v-show="!isManageMode || reservation.editable">
      <v-spacer></v-spacer>
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
    </v-card-actions>
  </v-card>
</template>

<script>
import format from '@/services/format'
import Msg from '@/services/msg'
import {Reservation, reservationStatusStep} from '@/model/reservation'
import ReservationService from '@/services/aws/reservation'

export default {
  name: 'ReservationForm',
  props: {
    reservation: Reservation,
    // 是否為管理員模式
    isManageMode: {
      type: Boolean,
      default: false
    }
  },
  inject: ['agree', 'cancel'],
  data: () => ({
    calendar: {
      // 預約起訖日
      reservationMinDate: null,
      reservationDateMenu: false,
      reservationDate: [],

      // 審核時間
      verifyDateMinDate: null,
      verifyDateMenu: false,
      // 取書時間
      takeDateMinDate: null,
      takeDateMenu: false,
      // 歸還時間
      returnDateMinDate: null,
      returnDateMenu: false
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
    Object.assign(this.form, this.reservation)

    if (this.isManageMode) {
      // 查看預約時，不可更改任何欄位
      this.card.disabled = !this.reservation.editable
      this.calendar.reservationDate = [this.reservation.reservationDate, this.reservation.dueDate]
      // 因為申請日一開始就有，所以可以在這裡設置 MinDate，其餘需要使用 Computed Function
      // 預約日期不可在使用者申請日之前
      this.calendar.reservationMinDate = this.form.applyDate
      // 審核日不可在使用者申請日之前
      this.calendar.verifyDateMinDate = this.form.applyDate
    } else {
      // 預約日期只能選擇三天後
      let tempDate = new Date()
      tempDate.setDate(tempDate.getDate() + 4)
      this.calendar.reservationMinDate = format.toDateStr(tempDate)
    }

  },
  computed: {
    reservationMaxDate() {
      if (this.calendar.reservationDate.length > 0) {
        let [start] = this.calendar.reservationDate
        // 預約 MAX 日期同到期時間，為預約日期往後 30 天
        let tempDate = new Date(start)
        tempDate.setDate(tempDate.getDate() + 30)
        return format.toDateStr(tempDate)
      }
      return null
    },
    verifyMaxDate() {
      let date = this.form.takeDate
      return date ? date : null
    },
    takeMinDate() {
      let date = this.form.verifyDate
      return date ? date : null
    },
    takeMaxDate() {
      let date = this.form.returnDate
      return date ? date : null
    },
    returnMinDate() {
      let date = this.form.takeDate
      return date ? date : null
    },
    reservationDateFormatted() {
      return this.calendar.reservationDate.map(format.formatDate).join(' ~ ')
    },
    verifyDateFormatted() {
      let date = this.form.verifyDate
      return date ? format.formatDate(date) : null
    },

    takeDateFormatted() {
      let date = this.form.takeDate
      return date ? format.formatDate(date) : null
    },

    returnDateFormatted() {
      let date = this.form.returnDate
      return date ? format.formatDate(date) : null
    },
    applicant() {
      return this.reservation.user.empid + `-` + this.reservation.user.nameTW
    }
  },
  methods: {
    /** 選擇的預約日期不可以在預約佇列的預約時段中 **/
    allowReservationDates(val) {
      let queue = this.form.book.reservations
      return !queue || queue.filter(r => {
        // 日期在預約時段中
        return !(val > r.reservationDate && val < r.dueDate)
      }).length
    },

    reservationDateInput() {
      this.calendar.reservationDate.sort()
    },
    processData() {
      let [start, end] = this.calendar.reservationDate
      this.form.reservationDate = start
      this.form.dueDate = end

      if (this.isManageMode) {
        this.managerProcess()
      } else {
        this.userProcess()
      }
    },
    /** 使用者使用預約的處理 **/
    userProcess() {
      this.form.applyDate = format.toDateStr(new Date())
      this.form.status = reservationStatusStep.STEP2
    },

    /** 管理員使用預約的處理 **/
    managerProcess() {
      // 從最後的日期（歸還日）往前判斷預約的狀態，管理者編輯的這一步狀態已為「已取書」
      this.form.status = this.form.returnDate ? reservationStatusStep.END :
          this.form.takeDate ? reservationStatusStep.STEP4 : reservationStatusStep.STEP3;
    },
    save() {
      if (!this.$refs.reservationForm.validate()) return

      this.card.loading = true
      this.card.disabled = true

      this.processData()
      // 管理者使用更新，使用者使用建立
      let method = (this.isManageMode ? 'update' : 'create') + 'Reservation'
      let msg = this.isManageMode ? Msg.i18N.success_reservation_save : Msg.i18N.success_reservation
      let errMsg = this.isManageMode ? Msg.i18N.err_reservation_save : Msg.i18N.err_reservation

      ReservationService[method](this.form)
          .then(() => Msg.success(msg))
          .catch(err => Msg.error(errMsg, err))
          .finally(() => {
            this.agree()
            this.card.loading = false
            this.card.disabled = false
          })
    }
  }
}
</script>

