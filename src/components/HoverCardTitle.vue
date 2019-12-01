<template>
  <v-col
    :cols="cols"
    :md="md"
  >
    <v-hover
      v-slot:default="{ hover }"
    >
      <v-card
        :elevation="hover ? 12 : 2"
        class="mx-auto"
      >
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-center">{{ info.big }}</div>
        </v-card-title>
        <v-card-text>
          <div class="text-center"><p>{{ info.small }}</p></div>
        </v-card-text>
        <v-fab-transition>
          <v-btn
            v-if="hover"
            color="cyan"
            dark
            small
            absolute
            bottom
            right
            fab
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  props: {
    mobile: Number,
    desktop: Number,
    item: {}
  },
  data() {
    return {
      cols: this.mobile,
      md: this.desktop,
      info: {...this.item}
    }
  }
}
</script>
