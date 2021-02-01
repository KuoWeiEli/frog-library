<template>
  <v-dialog
      v-model="dialog.visible"
      :max-width="dialog.maxWidth"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
      >
        {{dialog.activator}}
      </v-btn>
    </template>
    <slot>
      <div>This is Dialog</div>
    </slot>
  </v-dialog>
</template>
<script>

export default {
  name: 'basic-dialog',
  props: {
    dialog: {
      visible: Boolean,
      maxWidth: String,
      activator: String
    },
  }
}
</script>