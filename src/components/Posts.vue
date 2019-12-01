<template>
  <v-flex xs12 md4>
    <v-card flat class="transparent">
      <v-card-text class="text-center">
        <v-icon x-large class="blue--text text--lighten-2">{{ icon }}</v-icon>
      </v-card-text>
      <v-card-title primary-title class="layout justify-center">
        <div class="headline text-center">{{ info.title }}</div>
      </v-card-title>
      <v-card-text>
        <div><p>{{ info.content }}</p></div>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    type: String,
    item: Object
  },
  data () {
    return {
      info: {...this.item},
      icon: ''
    }
  },
  mounted() {
    if(this.type === 'left') {
      this.icon = 'fas fa-atom'
    }else if(this.type === 'center') {
      this.icon = 'fas fa-procedures'
    }else if(this.type === 'right') {
      this.icon = 'fas fa-glass-cheers'
    }
  }
}
</script>
