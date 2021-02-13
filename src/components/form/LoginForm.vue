<template>
  <v-card
      :loading="card.loading"
      :disabled="card.disabled"
  >
    <v-card-title>
      <span class="headline">登入您的帳戶</span>
    </v-card-title>

    <v-card-text>
      <v-form
          @submit.prevent="signIn"
          ref="signInForm"
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
            <div class="hint">
              忘記密碼?
              <v-btn
                  small
                  color="warning"
                  text
                  @click="$emit('forgot-password')"
              >
                重設密碼
              </v-btn>
            </div>
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
              登入
            </v-btn>
          </v-col>
          <v-col
              cols="12"
              class="text-center"
          >
            還沒有帳戶嗎？
            <v-btn
                small
                color="primary"
                text
                to="/register"
            >
              建立帳戶
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
import UserService from '@/services/aws/user'
import Msg from '@/services/msg'

export default {
  name: "LoginForm",
  components: {Email, Password},
  data: () => ({
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
    signIn() {
      if (!this.$refs.signInForm.validate()) return

      this.triggerCard()
      let {email, password} = this.form
      AuthService.signIn(email, password)
          .then(info => {
            let {username} = info

            UserService.getUserAndAvatar(username)
                .then(data => {
                  this.$store.commit('setUser', data)

                  Msg.success('登入成功！')
                  this.$router.push('/')
                })
                .catch(err => {
                  Msg.error('登入失敗！請洽系統管理員！')
                  console.log(err)
                  this.triggerCard()
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

<style scoped>
.hint {
  font-size: 0.8em;
  color: darkgray;
}

</style>