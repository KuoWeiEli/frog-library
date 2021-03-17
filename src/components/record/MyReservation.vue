<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :sort-by="['applyDate']"
        :sort-desc="true"
        :search="search"
        multi-sort
        show-expand
        class="elevation-1"
    >
      <template v-slot:item.actions="{item}">
        <!-- 當預約狀態在「待審核」、「待取書」時，皆可以使用取消功能 -->
        <v-btn
            v-show="/[23]/.test(item.status)"
            x-small
            text
            icon
            class="mr-2"
            color="primary"
            @click="cancel(item)"
        >
          <v-icon small>
            mdi-cancel
          </v-icon>
          取消
        </v-btn>
      </template>

      <template v-slot:expanded-item="{headers, item}">
        <td :colspan="headers.length">
          <div class="flow">
            <el-steps :active="item.activeStep" align-center>
              <template v-if="isLoaded">
                <el-step
                    v-for="step in item.steps"
                    :key="step.title"
                    :title="step.title"
                    :status="step.status">
                  <template v-slot:description>
                    {{ step.desc }}<br v-if="step.desc"/>{{ step.statusDesc }}
                  </template>
                </el-step>
              </template>
            </el-steps>
          </div>
        </td>
      </template>

      <template v-slot:top>
        <simple-tool-bar
          title="我的預約"
          v-model="search"
        ></simple-tool-bar>
      </template>
    </v-data-table>

    <simple-dialog ref="dialog" persistent></simple-dialog>
  </div>
</template>

<script>
import ReservationService from '@/services/aws/reservation'
import {Reservation, reservationStatus} from '@/model/reservation'
import {User} from '@/model/user'
import Msg from '@/services/msg'
import SimpleDialog from '@/components/core/SimpleDialog'
import SimpleToolBar from '@/components/core/SimpleToolBar'

export default {
  name: "MyReservation",
  data: () => ({
    search: '',
    headers: [
      {text: '操作', value: 'actions', sortable: false},
      {text: '狀態', value: 'statusDisplay'},
      {text: '書刊名', value: 'book.name'},
      {text: '申請時間', value: 'applyDate'},
      {text: '預約起日', value: 'reservationDate'},
      {text: '到期時間', value: 'dueDate'},
      {text: '審核時間', value: 'verifyDate'},
      {text: '取書時間', value: 'takeDate'},
      {text: '歸還時間', value: 'returnDate'},
      {text: '流程圖', value: 'data-table-expand', filterable: false}
    ],
    items: [],
    user: new User(),
    isLoaded: false,
    reservationStatus: reservationStatus
  }),
  components: {SimpleDialog, SimpleToolBar},
  created() {
    this.user = this.$store.state.user
    this.initialize()
    this.subscribe()
  },
  methods: {
    initialize() {
      ReservationService.getAllByUserID(this.user.id)
          .then(data => {
            this.items = data
            this.items.forEach(item => {
              item.statusDisplay = this.reservationStatus[item.status]
            })
            this.configureStep()
            this.isLoaded = true
          })
          .catch(err => Msg.error(Msg.i18N.err_query, err))
    },
    createStep(title, desc, status, statusDesc) {
      return {
        title: title,
        desc: desc,
        status: status,
        statusDesc: (statusDesc ? `狀態：${statusDesc}` : '')
      }
    },
    configureStep() {
      /**
       * Status:
       * D: Deny
       * T: Timeout
       * C: Cancel
       * 2: Step2
       * 3: Step3
       * 4: Step4
       */

      this.items.forEach(this.createSteps)
    },
    createSteps(reservation) {
      reservation.steps = []
      reservation.activeStep = 0
      reservation.steps.push(this.createStep1(reservation))
      reservation.steps.push(this.createStep2(reservation))
      reservation.steps.push(this.createStep3(reservation))
      reservation.steps.push(this.createStep4(reservation))
    },
    createStep1(each) {
      each.activeStep++
      return this.createStep('申請', `送出時間：${each.applyDate}`, 'success', '已送出')
    },
    createStep2(each) {
      const isDeny = each.status === 'D'
      const isCanceled = each.status === 'C'

      let status;
      let statusDesc;

      if (each.verifyDate) {
        if (isDeny) {
          status = 'error'
          statusDesc = '審核失敗'
        } else {
          each.activeStep++
          status = 'success'
          statusDesc = '審核成功'
        }
      } else {
        if (isCanceled) {
          status = 'finish'
          statusDesc = '已取消'
        } else {
          status = '';
          statusDesc = '待審理';
        }
      }

      return this.createStep('審核', each.verifyDate ? `審核時間：${each.verifyDate}` : '', status, statusDesc);
    },
    createStep3(each) {
      const isCanceled = each.status === 'C'
      let status = '';
      let statusDesc = '';

      if (each.activeStep > 1) { // 取書階段
        if (each.takeDate) {
          status = 'success'
          statusDesc = '已取書'
          each.activeStep++
        } else {
          if (isCanceled) {
            status = 'finish'
            statusDesc = '已取消'
          } else {
            statusDesc = '等待取書'
          }
        }
      }
      return this.createStep('取書', each.takeDate ? `取書時間：${each.takeDate}` : '', status, statusDesc)
    },
    createStep4(each) {
      const isTimeout = each.status === 'T'
      return this.createStep('歸還', each.activeStep > 2 ? (each.returnDate ? `歸還時間：${each.returnDate}` : `到期時間：${each.dueDate}`) : '',
          each.returnDate ? 'success' : (isTimeout ? 'error' : ''),
          each.returnDate ? '已歸還' : (isTimeout ? '已逾期' : ''));
    },
    cancel(item) {
      this.$refs.dialog
          .open({
            title: '取消預約提醒',
            msg: `你確定要取消預約【${item.book.name}】這本書嗎？`
          })
          .then(agree => {
            if (agree)
              this.cancelReservation(item)
          })
          .catch(() => {})
    },
    cancelReservation(item) {
      let reservation = Object.assign(new Reservation(), item)
      reservation.status = 'C'

      ReservationService.updateReservation(reservation)
          .then(() => Msg.success(Msg.i18N.success_reservation_cancel))
          .catch(err => Msg.error(Msg.i18N.err_reservation_cancel, err))
    },

    subscribe() {
      ReservationService.subscribe(
          reservation => {
            reservation.statusDisplay = this.reservationStatus[reservation.status]
            this.items.push(reservation)
            this.createSteps(reservation)
          },
          reservation => {
            reservation.statusDisplay = this.reservationStatus[reservation.status]
            let index = this.items.findIndex(item => item.id === reservation.id)
            let target = this.items[index]
            Object.assign(target, reservation)
            this.createSteps(target)
          },
          reservation => {
            let index = this.items.findIndex(item => item.id === reservation.id)
            this.items.splice(index, 1)
          })
    }
  }
}
</script>

<style scoped>
.flow {
  padding: 20px 0px
}

</style>