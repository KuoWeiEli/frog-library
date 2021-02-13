<template>
  <v-card
      v-bind="$attrs"
      :loading="loading"
      :disabled="disabled"
  >
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>

    <div class="d-sm-flex flex-sm-nowrap justify-sm-space-between">
      <slot name="prepend"></slot>

      <div>
        <v-card-text>
          <v-container>
            <slot></slot>
          </v-container>
        </v-card-text>
      </div>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>

      <slot name="action">
        <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="$emit('save')"
        >
          Save
        </v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'BasicCard',
  props: {
    title: {},
    loading: Boolean,
    disabled: Boolean
  }
}
</script>