<template>
  <v-text-field
      type="email"
      label="Email"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event)"
      :rules="rule"
  ></v-text-field>
</template>

<script>
export default {
  name: "Email",
  props: {
    value: String
  },
  data: () => ({
    rule: [
      v => !!v || 'Email 是必填欄位！',
      v => !v || /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(v) || 'Email 格式不正確！'
    ]
  })
}
</script>