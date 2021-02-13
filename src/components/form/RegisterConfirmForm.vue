<template>
  <v-card
      :loading="card.loading"
      :disabled="card.disabled"
  >
    <v-card-title>
      <span class="headline">驗證您的 Email</span>
    </v-card-title>

    <v-card-text>
      <v-form
          @submit.prevent="confirmRegister"
          ref="confirmRegisterForm"
      >
        <v-row>
          <v-col
              cols="12"
          >
            <email
                v-model="email"
                disabled
            ></email>
          </v-col>
          <v-col
              cols="12"
          >
            <verification-code
                v-model="form.verificationCode"
                :email="email"
                type="R"
            ></verification-code>
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
              驗證
            </v-btn>
          </v-col>
          <v-col
              cols="12"
              class="text-center"
          >
            <v-btn
                small
                color="primary"
                text
                to="/login"
            >
              回到登入
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

import Email from '@/components/form/element/Email'
import VerificationCode from '@/components/form/element/VerificationCode'
import AuthService from '@/services/aws/auth'
import Msg from '@/services/msg'

export default {
  name: 'RegisterConfirmForm',
  components: {Email, VerificationCode},
  props: {
    email: String
  },
  data: () => ({
    isLoading: false,
    form: {
      verificationCode: ''
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
    confirmRegister() {
      if (!this.$refs.confirmRegisterForm.validate()) return

      this.triggerCard()
      AuthService.confirmSignUp(this.email, this.form.verificationCode)
          .then(() => {
            this.$emit('success')
          })
          .catch(err => {
            Msg.error(err.message)
            this.triggerCard()
          })
    }
  }
}
</script>

<style scoped>

</style>