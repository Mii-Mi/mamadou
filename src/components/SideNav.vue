<template>
  <v-navigation-drawer
      v-model="show"
      class="grey lighten-3"
      app
      right
    >
      <v-list dense>
        <v-list-item link @click="home()">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Accueil</v-list-item-title>
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
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    home() {
      this.$router.push('/')
    },
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