<template>
  <el-dialog :visible="appointment.visible" title="申請預約" :show-close="false">
    <el-form :model="appointmentForm">
      <el-form-item label="書名" :label-width="formLabelWidth">
        <el-input v-model="appointment.bookData.bookName" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="申請人" :label-width="formLabelWidth">
        <el-input v-model="appointmentForm.applicant" autocomplete="off" readonly></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="appointment.visible = false">取消預約</el-button>
      <el-button type="primary" @click="appointment.visible = false">確認預約</el-button>
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
        applicant: this.appointment.empData.empId + '-' + this.appointment.empData.empName,
      }
    }
  }
}
</script>
