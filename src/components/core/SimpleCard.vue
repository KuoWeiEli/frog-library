<template>
  <v-card>
    <v-card-title class="headline" v-show="!!cardProps.title">{{ cardProps.title }}</v-card-title>
    <v-card-text v-show="!!cardProps.msg" v-html="cardProps.msg"></v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="darken-1"
          text
          @click="cancel"
      >
        {{ !!cardProps.cancelBtnText ? cardProps.cancelBtnText : '取消' }}
      </v-btn>
      <v-btn
          color="blue darken-1"
          text
          @click="agree"
      >
        {{ !!cardProps.agreeBtnText ? cardProps.agreeBtnText : '確定' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'SimpleCard',
  props: {
    cardProps: {}
  },
  inject: ['agree', 'cancel']
}
</script>