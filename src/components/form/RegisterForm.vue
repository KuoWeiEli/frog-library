<template>
  <v-card
      :loading="card.loading"
      :disabled="card.disabled"
  >
    <v-card-title>
      <span class="headline">建立一個帳戶</span>
    </v-card-title>

    <v-card-text>
      <v-form
          @submit.prevent="signUp"
          ref="signUpForm"
      >
        <v-row>
          <v-col
              cols="12"
          >
            <email
                v-model="form.email"
            ></email>
          </v-col>
          <v-col
              cols="12"
          >
            <password
                v-model="form.password"
            ></password>
          </v-col>
          <v-col
              cols="12"
          >
            <v-btn
                :loading="isLoading"
                type="submit"
                block
                color="primary"
                elevation="3"
            >
              建立
            </v-btn>
          </v-col>
          <v-col
              cols="12"
              class="text-center"
          >
            已經有帳戶了？
            <v-btn
                color="primary"
                text
                to="/login"
            >
              登入
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>

import Email from '@/components/form/element/Email'
import Password from '@/components/form/element/Password'
import AuthService from '@/services/aws/auth'
import Msg from '@/services/msg'

export default {
  name: 'RegisterForm',
  components: {Email, Password},
  data: () => ({
    isLoading: false,
    form: {
      email: '',
      password: ''
    },
    card: {
      loading: false,
      disabled: false
    }
  }),
  methods: {
    triggerCard() {
      this.card.loading = !this.card.loading
      this.card.disabled = !this.card.disabled
    },
    signUp() {
      if (!this.$refs.signUpForm.validate()) return

      this.triggerCard()
      let {email, password} = this.form
      AuthService.signUp(email, password)
          .then(({userSub, user: {username}}) => {
            this.$emit('success', {
              id: userSub,
              email: username
            })
          })
          .catch(error => {
            Msg.error(error.message)
            this.triggerCard()
          })
    }
  }
}
</script>
