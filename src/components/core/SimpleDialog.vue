<template>
  <v-dialog
      v-bind="$attrs"
      v-model="dialog"
      :width="options.width"
  >
    <simple-card :card-props="dialogProps"/>
  </v-dialog>
</template>

<script>
import SimpleCard from '@/components/core/SimpleCard'

export default {
  name: 'SimpleDialog',
  components: {SimpleCard},
  data: () => ({
    dialog: false,
    dialogProps: {
      title: null,
      msg: null,
      cancelBtnText: null,
      agreeBtnText: null
    },
    options: {
      width: 400
    },
    resolve: null,
    reject: null
  }),
  methods: {
    open(props, options) {
      Object.assign(this.dialogProps, props)
      Object.assign(this.options, options)

      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.dialog = false
      this.resolve(true)
    },
    cancel() {
      this.dialog = false
      this.reject('cancel')
    }
  },
  provide: function() {
    return {
      agree: this.agree,
      cancel: this.cancel
    }
  }
}
</script>