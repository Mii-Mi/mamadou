<template>
   <div>
     <!-- <snackbar /> -->
     <router-view />
   </div>
</template>

<script>
import store from './store/Store'
// import snackbar from './components/Snackbar'

export default {
  store: store,
  name: 'App',

  // components: {
  //   snackbar
  // },

  // data: () => {
  //   return {
  //   }
  // },
};
</script>
