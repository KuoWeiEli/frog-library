<template>
  <el-dialog :visible="appointment.visible" title="申請預約" :show-close="false" @closed="dialogClose">
    <el-form ref="appointmentForm" :model="appointmentForm" :rules="rules" status-icon>
      <el-form-item label="書名" :label-width="formLabelWidth" prop="bookName">
        <el-input v-model="appointment.bookData.bookName" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="申請人" :label-width="formLabelWidth" prop="applicant">
        <el-input v-model="appointmentForm.applicant" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="預約時間" :label-width="formLabelWidth" prop="appointDate">
        <div class="block">
          <el-date-picker
              v-model="appointmentForm.appointDate"
              type="date"
              placeholder="選擇日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="appointment.visible = false">取消預約</el-button>
      <el-button type="primary" @click="submit">確認預約</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'appoint-dialog',
  props: {
    appointment: {
      visible: Boolean,
      bookData: {},
      empData: {}
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      appointmentForm: {
        bookName: this.appointment.bookData.bookName,
        applicant: this.appointment.empData.empId + '-' + this.appointment.empData.empName,
        appointDate: null
      },
      rules: {
        appointDate: {required: true, message: '請選擇預約時間'},
        bookName: {required: true, message: '申請書目尚未選擇'},
        applicant: {required: true, message: '申請人尚未選擇'}
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
      this.$refs['appointmentForm'].validate(valid => {
        if (valid) {
          this.appointment.visible = false
          this.$message({
            type: 'success',
            message: '預約成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '預約時間尚未選擇!'
          })
        }
      })
    },
    dialogClose() {
      this.$refs['appointmentForm'].resetFields()
    }
  }
}
</script>
