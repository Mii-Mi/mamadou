<template>
  <v-app id="inspire">
    <snackbar />
    <side-nav />
    <v-app-bar
      app
      color="cyan"
      dark
    >
      <v-spacer />

      <v-toolbar-title>Administration</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content class="grey lighten-2">
      <!-- Here my container component -->
      <home />
      <!-- End of my container component -->
    </v-content>

    <v-footer
      color="cyan"
      app
    >
      <v-spacer />

      <span class="white--text ml-4">
              Propulsé avec
              <v-icon class="red--text">mdi-heart</v-icon>
              par <a class="white--text" href="" target="_blank">Cécile</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  import axios from '../../../http-common'
  import {AUTH_LOGOUT} from '../../store/actions/auth'
  import home from '../../pages/Home'
  import snackbar from '../../components/Snackbar'
  import sideNav from '../../components/SideNav'

  export default {

    name: 'Admin',

    components: {
      home,
      snackbar,
      sideNav
    },
    beforeCreate () {
      axios.interceptors.response.use(response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          this.$router.push('/')
          this.$store.dispatch(AUTH_LOGOUT)
        }
        return error;
        },
      )
    }
  }
</script>