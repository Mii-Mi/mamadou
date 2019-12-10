<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-toolbar
                color="cyan"
                dark
                flat
              >
                <v-toolbar-title>Modifier</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" @submit.prevent="update()">
              <v-container>
                <v-row v-if="info.icon">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.icon"
                      :rules="iconRules"
                      label="Icone"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.title">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.title"
                      :rules="titleRules"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.big">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.big"
                      :rules="titleRules"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.small">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.small"
                      :rules="titleRules"
                      label="Sous-titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.topo">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.topo"
                      :rules="titleRules"
                      label="Topo"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.phone">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.phone"
                      :rules="titleRules"
                      label="Téléphone"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.adress">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.adress"
                      :rules="titleRules"
                      label="Adresse"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.email">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.email"
                      :rules="titleRules"
                      label="Courriel"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="info.content">
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="postBody.content"
                      filled
                      :rules="contentRules"
                      label="Contenu"
                      auto-grow
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan" text @click.stop="show = false">Quitter</v-btn>
                <v-btn type="submit" color="cyan" dark @click.stop="show = false">Envoyer</v-btn>
              </v-card-actions>
            </v-form>
          <small>*indique un champs requis</small>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from '../../http-common'
  // import { ADD_MSG } from '../store/actions/flash'

  export default {
    data: () => ({
      valid: false,
      
      iconRules: [
        v => !!v || 'le champs icone est requis'
      ],
      titleRules: [
        v => !!v || 'le champs titre est requis'
      ],
      contentRules: [
        v => !!v || 'le champs contenu est requis'
      ],
      postBody: {},
      info: {}
    }),
    props: {
      value: Boolean,
      item: Object
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
      update() {
        axios
          .put(`/articles/${this.info.id}`, this.postBody)
          .then((resp) => {
            localStorage.setItem('msg', resp.data.msg)
            setTimeout(() => {
              return this.$flash.$emit('msg')
            }, 500)
            this.$router.push('/')
          })
      }
    },
    mounted() {
      this.info = {...this.item}
      this.postBody = {...this.item}
    }
  }
</script>
