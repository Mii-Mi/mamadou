<template>
  <v-app id="inspire">
    <snackbar />
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Connexion administrateur</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="postBody.userName"
                    label="Utilisateur"
                    name="userName"
                    prepend-icon="fas fa-user"
                    type="text"
                  />

                  <v-text-field
                    v-model="postBody.pass"
                    id="password"
                    label="Mot de passe"
                    name="pass"
                    prepend-icon="fas fa-lock"
                    type="password"
                  />
                  <v-btn color="primary" type="submit">Connexion</v-btn>
                </v-form>
                <v-list-item v-if="errors && errors.length">
                  <v-list-item-content v-for="error of errors" :key="error.id">
                    <v-list-item-title>{{error.message}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {AUTH_REQUEST} from '../../store/actions/auth'
  import snackbar from '../../components/Snackbar'

  export default {
    data() {
      return {
        postBody: {
          userName: "",
          pass: ""
        },
        errors: []
      }
    },
    components: {
      snackbar
    },
    methods: {
      login: function () {
        const { userName, pass } = this.postBody
        setTimeout(() => {
          this.$flash.$emit('msg')
        }, 1000)
        this.$store.dispatch(AUTH_REQUEST, { userName, pass }).then(() => {
          this.$router.push('/admin')
        })
      }
    }
  }
</script>