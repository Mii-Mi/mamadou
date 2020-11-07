<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-toolbar
                color="cyan"
                dark
                flat
              >
            <v-toolbar-title>Nouveau contact</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" @submit.prevent="send()">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="postBody.firstName"
                      :rules="requiredRules"
                      label="Prénom *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="postBody.lastName"
                      :rules="requiredRules"
                      label="Nom *"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="postBody.email"
                      :rules="requiredRules"
                      label="Courriel *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="postBody.telephone"
                      label="Téléphone"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.adress"
                      label="Adresse"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.age"
                      label="Age"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan" text @click.stop="show = false">Quitter</v-btn>
                <v-btn type="submit" color="cyan" dark @click.stop="show = false">Envoyer</v-btn>
              </v-card-actions>
            </v-form>
          <small>* Champs requis</small>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from '../../http-common'

  export default {
    data: () => ({
      valid: false,

      requiredRules: [
        v => !!v || 'Champs requis'
      ],
      postBody: {
        firstName: '',
        lastName: '',
        email: '',
        telephone: null,
        adress: null,
        age: null,
      },
    }),
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
      send() {
        axios
          .post(`/admin/contacts/profile/add`, this.postBody)
          .then(resp => {
            if (resp.data.msg) {
              localStorage.setItem('msg', JSON.parse(JSON.stringify(resp.data.msg)));
            }
            if (resp.data.newContact) {
              this.$emit('new-contact', resp.data.newContact);
            }
          })
          .catch(error => {
            if (error.response.data.msg) {
              localStorage.setItem('msg', JSON.parse(JSON.stringify(error.response.data.msg)))
            }
          }).finally(() => {
            setTimeout(() => {
              return this.$flash.$emit('msg')
            }, 500)
          })
      }
    },
  }
</script>
