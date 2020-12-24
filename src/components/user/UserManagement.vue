<template>
  <div>
    <el-table
        :data="users"
        stripe
        style="width: 100%"
        height="800"
        size="small">
      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="edit(scope.row)"
                     size="small" icon="el-icon-edit">編輯
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
          prop="empId"
          label="員工編號"
          width="200">
      </el-table-column>
      <el-table-column
          prop="empName"
          label="員工姓名"
          width="200">
      </el-table-column>
      <el-table-column
          prop="email"
          label="電子信箱"
          width="200">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密碼"
          width="200">
      </el-table-column>
      <el-table-column
          prop="status"
          label="狀態"
          width="200">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from "axios"
// import UserManagementDialog from "@/components/user/UserManagementDialog"

export default {
  name: "UserManagement",
  // components: { UserManagementDialog },
  created() {
    this.getUsers()
  },
  data() {
    return {
      users: [],
      management: {
        visible: false,
        user: {}
      }
    }
  },
  methods: {
    async getUsers() {
      console.log('getUsers.....')
      axios.get('http://localhost:3000/users')
          .then(response => {
            this.users = response.data
            this.users.forEach(user => user.password = '***************')
          })
    },
    edit(row) {
      console.log(row)
      this.management.user = row
      this.management.visible = true
    },
    del(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>

</style>