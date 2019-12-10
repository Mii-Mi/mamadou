<template>
  <v-navigation-drawer
      class="grey lighten-3"
      v-model="drawer"
      app
      right
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import axios from '../../http-common'
import {AUTH_LOGOUT} from '../store/actions/auth'

export default {
  data: () => ({
    drawer: null,
  }),
  methods: {
    logout() {
      axios
        .delete(`/admin/logout`)
        .then((resp) => {
          localStorage.setItem('msg', resp.data.msg)
        })
        setTimeout(() => {
          return this.$flash.$emit('msg')
        }, 500)
        this.$store.dispatch(AUTH_LOGOUT).then(
          this.$router.push('/')
        )
    }
  }
}
</script>