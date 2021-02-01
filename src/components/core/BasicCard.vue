<template>
  <v-card
      :loading="loading"
      :disabled="disabled"
  >
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>

    <div class="d-flex flex-no-wrap justify-space-between">
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