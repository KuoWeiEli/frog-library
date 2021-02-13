<template>
  <v-text-field
      type="password"
      v-bind="$attrs"
      :label="$attrs.label? $attrs.label: '密碼'"
      :value="value"
      :rules="rule"
      @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: "Password",
  props: {
    value: String
  },
  data: () => ({
    rule: [
      v => !!v || '密碼是必填欄位！'
    ]
  })
}
</script>