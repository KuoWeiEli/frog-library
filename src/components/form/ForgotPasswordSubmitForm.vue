<template>
  <v-card
      :loading="card.loading"
      :disabled="card.disabled"
  >
    <v-card-title>
      <span class="headline">重設您的密碼</span>
    </v-card-title>

    <v-card-text>
      <v-form
          @submit.prevent="forgotPasswordSubmit"
          ref="forgotPasswordSubmitForm"
      >
        <v-row>
          <v-col
              cols="12"
          >
            <verification-code
                v-model="form.verificationCode"
                :email="email"
                type="F"
            ></verification-code>
          </v-col>
          <v-col
              cols="12"
          >
            <password
                label="新密碼"
                v-model="form.password"
            ></password>
          </v-col>

          <v-col
              cols="12"
          >
            <v-btn
                color="primary"
                text
                @click="$emit('back-login')"
            >
              回到登入
            </v-btn>
          </v-col>
          <v-col
              cols="12"
          >
            <v-btn
                type="submit"
                block
                color="primary"
                elevation="3"
            >
              確定
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import VerificationCode from '@/components/form/element/VerificationCode'
import Password from '@/components/form/element/Password'
import AuthService from '@/services/aws/auth'
import Msg from '@/services/msg'

export default {
  name: "ForgotPasswordSubmitForm",
  components: {VerificationCode, Password},
  props: {
    email: String
  },
  data: () => ({
    form: {
      verificationCode: '',
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
    forgotPasswordSubmit() {
      if (!this.$refs.forgotPasswordSubmitForm.validate()) return

      this.triggerCard()
      AuthService.forgotPasswordSubmit(this.email, this.form.verificationCode, this.form.password)
          .then(() => {
            Msg.success('已成功變更新密碼，請重新登入！')
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