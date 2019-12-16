<template>
   <div>
     <router-view />
   </div>
</template>

<script>
import store from './store/Store'

export default {
  store: store,
  name: 'App',
};
</script>
