<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form ref="loginForm" :model="form" :rules="rules" status-icon>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="email..."></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="password..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="submit('loginForm')">Login</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'login',
  data() {
    // let checkEmail = (rule, value, callback) => {
    //   let emailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    //   setTimeout(() => {
    //     if (emailReg.test(value))
    //       callback()
    //     else
    //       callback(new Error('請輸入正確的 Email 格式！'));
    //   }, 200);
    // };

    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {required: true, message: 'Please input your email', trigger: 'blur'},
          {
            pattern: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
            message: '請輸入正確的 Email 格式！', trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: 'Please input your password', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '登入成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '資料不正確，請確認!'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.loginBtn {
  width: 100%;
}

.el-row {
  height: 87vh;  /* set the height of el-row, let the align attribute can work */
}
</style>