<template>
  <v-flex xs12 sm4>
    <v-card flat class="transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline">{{ info.title }}</div>
      </v-card-title>
      <v-card-text>
        {{ info.content }}
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      info: {...this.item}
    }
  }
}
</script>