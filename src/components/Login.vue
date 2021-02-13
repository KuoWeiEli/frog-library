<template>
  <v-container>
    <div class="login">
      <login-form
          v-if="step===0"
          @forgot-password="step = 1"
      ></login-form>
      <forgot-password-form
          v-if="step===1"
          @back-login="step = 0"
          @after-send-code="afterSendCode"
      ></forgot-password-form>
      <forgot-password-submit-form
          v-if="step===2"
          :email="emailForForgotPassword"
          @back-login="step = 0"
          @success="step = 0"
      ></forgot-password-submit-form>
    </div>
  </v-container>
</template>

<script>

import LoginForm from '@/components/form/LoginForm'
import ForgotPasswordForm from '@/components/form/ForgotPasswordForm'
import ForgotPasswordSubmitForm from '@/components/form/ForgotPasswordSubmitForm'

export default {
  name: 'Login',
  components: {ForgotPasswordSubmitForm, LoginForm, ForgotPasswordForm},
  data: () => ({
    /**
     *  控制顯示變數
     *  0: 登入
     *  1: 重設密碼 Step1（發送驗證碼）
     *  2: 重設密碼 Step2（設定新密碼）
     **/
    step: 0,
    emailForForgotPassword: ''
  }),
  methods: {
    afterSendCode(event) {
      this.emailForForgotPassword = event
      this.step = 2
    }
  }
}
</script>

<style scoped>
.login {
  padding: 20px;
  max-width: 500px;
}
</style>