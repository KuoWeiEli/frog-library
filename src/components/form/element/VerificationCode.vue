<template>
  <div>
    <v-text-field
        label="驗證碼"
        v-bind="$attrs"
        :value="value"
        :rules="rule"
        @input="$emit('input', $event)"
    >
    </v-text-field>
    <div class="hint">
      沒有收到驗證碼？
      <v-btn
          small
          color="primary"
          text
          @click="reSend"
      >
        重新發送驗證碼
      </v-btn>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/aws/auth'
import Msg from '@/services/msg'

export default {
  name: "VerificationCode",
  props: {
    value: String,
    type: String,
    email: String
  },
  data: () => ({
    rule: [
      v => !!v || '請輸入信箱中收到的驗證碼！'
    ]
  }),
  methods: {
    reSend() {
      AuthService.reSendVerificationCodeByType(this.email, this.type)
          .then(() => Msg.warning('已重寄驗證碼，請至信箱中確認！'))
          .catch(err => Msg.error(err.message))
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