<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :sort-by="['statusDisplay', 'applyDate', 'reservationDate']"
        :sort-desc="[true, true, false]"
        class="elevation-1"
        multi-sort
    >
      <template v-slot:top>
        <simple-tool-bar
          title="預約管理"
          v-model="search"
        ></simple-tool-bar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- 只有狀態在「待審核」的情況下，有「核可」與「拒絕」選項，其餘為「查看」與「編輯」選項 -->
        <v-btn
            v-show="item.status === reservationStatusStep.STEP2"
            x-small
            text
            icon
            class="mr-2"
            color="success"
            @click="verify(item, true)">
          <v-icon small>mdi-hand-okay</v-icon>
          核可
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            v-show="item.status === reservationStatusStep.STEP2"
            x-small
            text
            icon
            class="mr-2"
            color="danger"
            @click="verify(item, false)">
          <v-icon small>mdi-close-circle-outline</v-icon>
          拒絕
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            v-show="item.status !== reservationStatusStep.STEP2"
            x-small
            text
            icon
            class="mr-2"
            color="primary"
            @click="editItem(item)"
        >
          <v-icon small>
            {{ item.editable ? 'mdi-lead-pencil' : 'mdi-magnify' }}
          </v-icon>
          {{ item.editable ? '編輯' : '查看' }}
        </v-btn>
        <v-spacer></v-spacer>
        <!--當狀態為「待審核」、「待取書」時可以取消-->
        <v-btn
            v-show="item.editable && item.status !== reservationStatusStep.STEP4"
            x-small
            text
            icon
            class="mr-2"
            color="warning"
            @click="cancel(item)"
        >
          <v-icon small>
            mdi-cancel
          </v-icon>
          取消
        </v-btn>
      </template>
    </v-data-table>

    <simple-dialog
        ref="dialog"
    >
      <template
          v-slot:default="{dialog}"
      >
        <reservation-form
            v-if="dialog"
            :is-manage-mode="true"
            :reservation="editedItem"
        ></reservation-form>
      </template>
    </simple-dialog>

  </div>
</template>

<script>
import {Reservation, reservationStatus, reservationStatusStep, isPendding} from '@/model/reservation'
import ReservationService from '@/services/aws/reservation'
import Msg from '@/services/msg'
import format from '@/services/format'
import SimpleDialog from '@/components/core/SimpleDialog'
import ReservationForm from '@/components/form/ReservationForm'
import SimpleToolBar from '@/components/core/SimpleToolBar'

export default {
  name: 'ReservationManagement',
  components: {SimpleDialog, ReservationForm, SimpleToolBar},
  data: () => ({
    search: '',
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '預約狀態', value: 'statusDisplay'},
      {text: '申請人', value: 'applicant'},
      {text: '申請時間', value: 'applyDate'},
      {text: '書刊名', value: 'book.name'},
      {text: '預約起日', value: 'reservationDate'},
      {text: '到期時間', value: 'dueDate'},
      {text: '審核時間', value: 'verifyDate'},
      {text: '取書時間', value: 'takeDate'},
      {text: '歸還時間', value: 'returnDate'},
    ],
    items: [],
    editedItem: new Reservation(),
    reservationStatusMap: reservationStatus,
    reservationStatusStep: reservationStatusStep
  }),

  created() {
    this.initialize()
    this.subscribe()
  },

  methods: {
    verify(item, isOK) {
      let reservation = Object.assign(new Reservation(), item)
      // 審核 OK，預約進入「待取書」階段，否則為「已拒絕」
      reservation.status = isOK ? reservationStatusStep.STEP3 : reservationStatusStep.DENY
      reservation.verifyDate = format.toDateStr(new Date())

      ReservationService.updateReservation(reservation)
          .then(() => Msg.success(Msg.i18N.success_reservation_verified))
          .catch(err => Msg.error(Msg.i18N.err_reservation_verified, err))
    },

    editItem(item) {
      this.editedItem = Object.assign(new Reservation(), item)
      this.$refs.dialog
          .open({}, { width: 800 })
          .then(Function)
          .catch(Function)
    },

    initialize: function () {
      ReservationService.getAll()
          .then(data => {
            this.items = data
            this.items.forEach(this.attachDisplayAttrToReservation)
          })
    },

    /** 為指定預約添加顯示用屬性 **/
    attachDisplayAttrToReservation(reservation) {
      // 只能在待審核、待取書、待歸還的狀態下編輯預約資訊
      reservation.editable = isPendding(reservation.status)
      reservation.statusDisplay = this.reservationStatusMap[reservation.status]
      reservation.applicant = reservation.user.empid + '-' + reservation.user.nameTW
    },

    subscribe() {
      ReservationService.subscribe(
          reservation => {
            this.attachDisplayAttrToReservation(reservation)
            this.items.push(reservation)

          },
          reservation => {
            this.attachDisplayAttrToReservation(reservation)
            let index = this.items.findIndex(item => item.id === reservation.id)
            let target = this.items[index]
            Object.assign(target, reservation)
          },
          reservation => {
            let index = this.items.findIndex(item => item.id === reservation.id)
            this.items.splice(index, 1)
          })
    },

    cancel(item) {
      ReservationService.cancelReservation(Object.assign(new Reservation(), item))
    }
  }
}
</script>

