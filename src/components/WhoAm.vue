<template>
  <v-flex xs12 sm4>
    <v-card flat class="transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline" v-if="info[0]">{{ info[0].title }}</div>
      </v-card-title>
      <v-card-text v-if="info[0]">
        {{ info[0].content }}
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
  mounted() {
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