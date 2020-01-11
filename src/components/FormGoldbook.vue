<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-toolbar
                color="blue lighten-2"
                dark
                flat
              >
            <v-toolbar-title>Exprimez-vous !</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" @submit.prevent="">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.author"
                      :rules="nameRules"
                      label="Votre nom"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="postBody.comment"
                      filled
                      :rules="contentRules"
                      label="Votre avis (140 caractères max)"
                      auto-grow
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-2" text @click.stop="show = false">Quitter</v-btn>
                <v-btn type="submit" color="blue lighten-2" dark @click.stop="show = false">Envoyer</v-btn>
              </v-card-actions>
            </v-form>
          <small>Tous les champs sont requis.<br />Votre commentaire sera soumis à validation.</small>
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
      
      nameRules: [
        v => !!v || 'le champs nom est requis'
      ],
      contentRules: [
        v => !!v || 'le champs contenu est requis'
      ],
      postBody: {
        author: '',
        comment: ''
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
          .post(`/messages/add`, this.postBody)
          .then(resp => {
            if (resp.data.msg) {
              localStorage.setItem('msg', JSON.parse(JSON.stringify(resp.data.msg)))
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
