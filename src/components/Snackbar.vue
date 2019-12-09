<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="top"
    >
      {{ getMsg }}
      <v-btn
        color="cyan"
        text
        v-on:click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>

  export default {
    
    data: () => ({
      snackbar: false,
      timeout: 3000,
      top:'top',
    }),
    computed: {
      getMsg: function () {
        return localStorage.getItem('msg')
      }
      
    },
    methods: {

      kill () {
        localStorage.removeItem('msg')
      },

      show () {
        this.snackbar = true
      }
    },
    beforeMount () {
      if (this.getMsg) {
        this.$flash.$on('msg', this.show)
      }
      
    },
    updated () {
      this.kill()
      this.$flash.$off('msg')
    },
  }
</script>