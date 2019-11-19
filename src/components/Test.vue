<template>
  <div>
    <div v-if="info[1]"><p>Je suis un vilain monstre, je m'appelle {{ info[1].name }} et je suis {{ info[1].personality }}</p></div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  data () {
    return {
      info: [{id: null, name: null, personality: null}]
    }
  },
  methods: {
   
  },
  mounted() {
    http
    .get('/')
    .then(response => {
      this.info = response.data
    })
    // .catch(error => {
    //   console.log(error)
    // })
  }
}
</script>