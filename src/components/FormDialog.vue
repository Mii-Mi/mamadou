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
            <v-form v-model="valid">
              <v-container>
                <v-row v-if="postBody.icon">
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
                <v-row v-if="postBody.title">
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
                <v-row v-if="postBody.big">
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
                <v-row v-if="postBody.small">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.small"
                      :rules="titleRules"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="postBody.phone">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.phone"
                      :rules="titleRules"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="postBody.adress">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.adress"
                      :rules="titleRules"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="postBody.email">
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="postBody.email"
                      :rules="titleRules"
                      label="Titre"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="postBody.content">
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
  export default {
    data: () => ({
      valid: false,
      // postBody: {
      //   big: this.item.big,
      //   small: this.item.small,
      //   icon: this.item.icon,
      //   title: this.item.title,
      //   content: this.item.content,
      //   phone: this.item.phone,
      //   adress: this.item.adress,
      //   email: this.item.email,
      // },

      
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
    mounted() {
      return this.postBody = {...this.item}
    }
  }
</script>
