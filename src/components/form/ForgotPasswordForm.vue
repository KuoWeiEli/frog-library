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
          @submit.prevent="forgotPassword"
          ref="forgotPasswordForm"
      >
        <v-row>
          <v-col
              cols="12"
          >
            <email v-model="form.email"></email>
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
              發送驗證碼
            </v-btn>
          </v-col>

        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Email from '@/components/form/element/Email'
import AuthService from '@/services/aws/auth'
import Msg from '@/services/msg'

export default {
  name: "ForgotPasswordForm",
  components: { Email },
  data: () => ({
    form: {
      email: '',
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
    forgotPassword() {
      if (!this.$refs.forgotPasswordForm.validate()) return

      this.triggerCard()
      let email = this.form.email
      AuthService.forgotPassword(email)
          .then(() => {
            Msg.warning('已寄出驗證碼，請至信箱中確認！')
            this.$emit('after-send-code', email)
          })
          .catch(err => {
            Msg.error(err.message)
            this.triggerCard()
          })
    }
  }
}
</script>