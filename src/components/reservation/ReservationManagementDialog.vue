<template>
  <el-dialog width="1100px" :visible="management.visible" title="預約管理" :show-close="false" @open="dialogOpen" @closed="dialogClose">
    <el-form ref="reservationManagementForm" :model="reservationManagementForm"
             :label-width="formLabelWidth" status-icon>
      <el-form-item label="書名" prop="bookName">
        <el-input v-model="reservationManagementForm.bookName" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="申請人" prop="applicant">
        <el-input v-model="reservationManagementForm.applicant" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="申請時間">
        <el-col :span="8">
          <el-form-item>
            <el-date-picker
                v-model="reservationManagementForm.applyDate"
                type="date"
                placeholder="選擇日期"
                value-format="yyyy/MM/dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="預約時段">
            <el-date-picker
                v-model="reservationManagementForm.reservationRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="預約起日"
                end-placeholder="到期時間"
                value-format="yyyy/MM/dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="審核時間">
        <el-col :span="8">
          <el-form-item>
            <el-date-picker
                v-model="reservationManagementForm.verifyDate"
                type="date"
                placeholder="選擇日期"
                value-format="yyyy/MM/dd"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="取書時間">
            <el-date-picker
                v-model="reservationManagementForm.takeDate"
                type="date"
                placeholder="選擇日期"
                value-format="yyyy/MM/dd"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="歸還時間">
            <el-date-picker
                v-model="reservationManagementForm.returnDate"
                type="date"
                placeholder="選擇日期"
                value-format="yyyy/MM/dd"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="management.visible = false">取消預約</el-button>
      <el-button type="primary" @click="submit">確認預約</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ReservationManagementDialog",
  props: {
    management: {
      visible: Boolean,
      reservation: {},
    }
  },
  data() {
    return {
      formLabelWidth: '80px',
      reservationManagementForm: {},
      rules: {
        appointDate: {required: true, message: '請選擇預約時間', trigger: 'blur'},
        bookName: {required: true, message: '申請書目尚未選擇', trigger: 'blur'},
        applicant: {required: true, message: '申請人尚未選擇', trigger: 'blur'}
      },
      pickerOptions: {
        disabledDate(time) {
          const date = new Date()
          // 預約日期只能選擇三天後
          date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
          return time.getTime() < date
        }
      }
    }
  },
  methods: {
    submit() {
      this.show()
      this.$refs['reservationManagementForm'].validate(valid => {
        if (valid) {
          this.management.visible = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '尚有欄位未填寫完成!'
          })
        }
      })
    },
    dialogOpen() {
      console.log('dialogOpen...')
      console.log(this.management)
      this.reservationManagementForm = Object.assign({}, this.management.reservation)
      this.reservationManagementForm.applicant = this.management.reservation.empId + '-' + this.management.reservation.empName
      this.reservationManagementForm.reservationRange = [
        this.reservationManagementForm.reservationDate,
        this.reservationManagementForm.dueDate
      ]
    },
    dialogClose() {
      this.$refs['reservationManagementForm'].resetFields()
    },
    show() {
      console.log(this.reservationManagementForm.reservationRange)
    }
  }
}
</script>

<style scoped>

</style>