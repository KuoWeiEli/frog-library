<template>
  <div>
    <el-card
        v-for="(reservation, index) in myReservations"
        :key="reservation.seq"
    >
      <div slot="header">
        <span>{{'#' + (myReservations.length - index) + '  ' + reservation.bookName}}{{'（測試說明:' +  reservation.testName + '）'}}</span>
<!--        <el-button style="float: right; padding: 3px 0" type="text">取消</el-button>-->
      </div>

      <el-steps :active="reservation.activeStep" align-center>
        <template v-if="isLoaded">
          <el-step
              v-for="step in reservation.steps"
              :key="step.title"
              :title="step.title"
              :status="step.status">
            <template v-slot:description>
              {{step.desc}}<br v-if="step.desc"/>{{step.statusDesc}}
            </template>
          </el-step>
        </template>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyReservation",
  data() {
    return {
      myReservations: {},
      isLoaded: false
    }
  },
  created() {
    this.initial()
  },
  methods: {
    async initial() {
      console.log('initial')
      await this.getMyReservations()
      this.configureStep()
      this.isLoaded = true
      console.log('initial finish')
    },
    getMyReservations() {
      return new Promise(resolve => {
        console.log('getMyReservations.....')
        axios.get('http://localhost:3000/reservations')
            .then(response => {
              console.log(`finish ajax`)
              this.myReservations = response.data
              resolve()
            })
      })
    },
    createStep(title, desc, status, statusDesc) {
      return {
        title: title,
        desc: desc,
        status: status,
        statusDesc: (statusDesc? `狀態：${statusDesc}`: '')
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

      console.log('configure step')
      this.myReservations.forEach(each => {
        each.steps = []
        each.activeStep = 0
        each.steps.push(this.createStep1(each))
        each.steps.push(this.createStep2(each))
        each.steps.push(this.createStep3(each))
        each.steps.push(this.createStep4(each))
      })
      console.log(this.myReservations)
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
        if (isDeny){
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

      return this.createStep('審核', each.verifyDate? `審核時間：${each.verifyDate}`: '', status, statusDesc);
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
      return this.createStep('取書', each.takeDate? `取書時間：${each.takeDate}`: '', status, statusDesc)
    },
    createStep4(each) {
      const isTimeout = each.status === 'T'
      return this.createStep('歸還', each.activeStep > 2? (each.returnDate? `歸還時間：${each.returnDate}`: `到期時間：${each.dueDate}`): '',
          each.returnDate ? 'success' : (isTimeout? 'error': ''),
          each.returnDate ? '已歸還' : (isTimeout? '已逾期': ''));
    }
  }
}
</script>

<style scoped>


</style>