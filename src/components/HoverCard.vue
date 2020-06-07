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
          <v-icon x-large class="blue--text text--lighten-2" v-if="info[0]">{{ info[0].icon }}</v-icon>
        </v-card-text>
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-center" v-if="info[0]">{{ info[0].title }}</div>
        </v-card-title>
        <v-card-text>
          <div v-if="info[0]" v-html="info[0].content"></div>
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
        <form-dialog v-model="dialog" v-if="info[0]" :item="{id: info[0].id, icon: info[0].icon, title: info[0].title, content: info[0].content, type:'commonposts'}" />
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import formDialog from '../components/FormDialog'
import axios from '../../http-common'

export default {
  props: {
    mobile: Number,
    desktop: Number,
    place: Number
  },
  data() {
    return {
      cols: this.mobile,
      md: this.desktop,
      position: null,
      info: [],
      dialog: false
    }
  },
  components: {
    formDialog
  },
  created() {
    this.position = this.place
    axios
    .get(`/admin/articles/common/${this.position}`)
    .then(response => {
      this.info = response.data
      }
    )
  }
}
</script>
