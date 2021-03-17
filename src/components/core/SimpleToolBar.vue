<template>
  <v-toolbar
      flat
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider
        class="mx-4"
        inset
        vertical
    ></v-divider>
    <v-text-field
        :value="value"
        @input="$emit('input', $event)"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
    ></v-text-field>
    <slot name="append"></slot>
  </v-toolbar>
</template>

<script>
export default {
  name: "SimpleToolBar",
  props: {
    title: String,
    value: String
  }
}
</script>

<style scoped>

</style>