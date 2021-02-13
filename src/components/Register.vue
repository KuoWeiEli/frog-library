<template>
  <v-container>
    <user-basic-form
        v-if="step===3"
        :edited-item="user"
        @success="userBasicSuccessfully"
    ></user-basic-form>

    <div v-if="step!==3" class="register">
      <register-form
          v-if="step===1"
          @success="registerSuccessfully"
      />
      <register-confirm-form
          v-if="step===2"
          :email="user.email"
          @success="registerConfirmSuccessfully"
      ></register-confirm-form>
    </div>
  </v-container>
</template>

<script>

import RegisterForm from '@/components/form/RegisterForm'
import RegisterConfirmForm from '@/components/form/RegisterConfirmForm'
import UserBasicForm from '@/components/form/UserBasicForm'
import Msg from '@/services/msg'

export default {
  name: 'Register',
  components: {RegisterForm, RegisterConfirmForm, UserBasicForm},
  data: () => ({
    /** 註冊流程：
     *  Step1: Email & Password
     *  Step2: 驗證 Email
     *  Step3: 填寫個人基本資料
     */
    step: 1,
    email: '',

    // Step3 section
    user: {
      id: '',
      email: '',
      // 初次建立使用者，大頭貼需要建立，所以標記為 true
      avatarChanged: true,
      // 註冊的使用者狀態設為「N」(在職)
      status: 'N'
    }
  }),
  methods: {
    registerSuccessfully(user) {
      this.step = 2
      Object.assign(this.user, user)
    },
    registerConfirmSuccessfully() {
      Msg.success('註冊成功！')
      this.step = 3
    },
    userBasicSuccessfully(user) {
      // 填寫完使用者基本資料後直接轉至首頁，並紀錄資訊
      this.$store.commit('setUser', user)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.register {
  padding: 20px;
  max-width: 500px;
}
</style>