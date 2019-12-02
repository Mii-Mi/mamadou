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
        <v-card-text class="text-center">
          <v-icon x-large class="blue--text text--lighten-2">{{ info.icon }}</v-icon>
        </v-card-text>
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-center">{{ info.title }}</div>
        </v-card-title>
        <v-card-text>
          <div><p>{{ info.content }}</p></div>
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
              @click.stop="dialog=true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-fab-transition>
        <form-dialog v-model="dialog" />
        
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import formDialog from '../components/FormDialog'

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
      info: {...this.item},
      dialog: false
    }
  },
  components: {
    formDialog
  }
}
</script>
