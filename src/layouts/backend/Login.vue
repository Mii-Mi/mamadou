<template>
  <v-app id="inspire">
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
                <v-form>
                  <v-text-field
                    v-model="postBody.userName"
                    label="Utilisateur"
                    name="useName"
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
                </v-form>
                <pre>{{postBody}}</pre>
                <v-list-item v-if="errors && errors.length">
                  <v-list-item-content v-for="error of errors" :key="error">
                    <v-list-item-title>{{error.message}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="sendData()">Connexion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import http from "../../../http-common"

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
    props: {
      
    },
    methods: {
      sendData () {
        http.post(`/admin/login`, {
          body: this.postBody,
        })
        .then(response => {

          if (response.data === 'ok') {
            return this.$router.push('/')
          }else{
            /* eslint-disable no-console */
            console.log('Mauvais mot de passe');
            /* eslint-enable no-console */
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  }
</script>