<template>
  <v-flex xs12 md4>
    <v-card flat class="transparent">
      <v-card-text class="text-center">
        <v-icon x-large class="light-green--text text--darken-4" v-if="info[0]">{{ info[0].icon }}</v-icon>
      </v-card-text>
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-center" v-if="info[0]">{{ info[0].title }}</div>
      </v-card-title>
      <v-card-text>
        <div v-if="info[0]" v-html="info[0].content"></div>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import axios from '../../http-common'

export default {
  props: {
    place: Number
  },
  data () {
    return {
      position: null,
      info: [],
    }
  },
  created() {
    this.position = this.place
    axios
    .get(`/articles/${this.position}`)
    .then(response => {
      this.info = response.data
      }
    )
  }
}
</script>
