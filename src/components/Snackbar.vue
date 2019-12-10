<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="top"
    >
      {{ msg }}
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
      msg:''
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
        this.msg = this.getMsg
        if (this.msg) {
          this.snackbar = true
        }
      }
    },
    mounted () {
      this.$flash.$on('msg', this.show)
    },
    updated () {
      this.kill()
      },
    beforeDestroy () {
      this.$flash.$off('msg')
    }
  }
</script>