<template>
  <el-row class="login" type="flex" justify="center" align="middle">
    <el-col :md="8">
      <div class="logo">
        <img src="../assets/frog_jump_circle.png" :height="logo.height" :width="logo.width" alt="德義公司LOGO"/>
        <h1>德義資訊圖書管理系統</h1>
      </div>
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
import device from "@/services/device";

export default {
  name: 'login',
  created() {
    if (device.isMobile()) {
      this.logo = {
        height: 100,
        width: 100
      }
    }
  },
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
      logo: {
        height: 296,
        width: 296,
      },
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {required: true, message: 'Please input your email', trigger: 'blur'},
          {
            pattern: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
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

.logo {
  text-align: center;
}

.login {
  height: 87vh;  /* set the height of el-row, let the align attribute can work */
}
</style>