<template>
  <v-card
    :elevation="2"
    class="mx-auto"
  >
  <v-toolbar
    dense
    color="cyan lighten-4"
    flat
  >
    <v-toolbar-title>Profil</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
    <v-list disabled>
      <v-list-item-group color="primary">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-child</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>âge : {{info.age}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-map-marker-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>adresse : {{info.adress}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-mail-bulk</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>courriel : {{info.email}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>téléphone : {{info.telephone}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {

  props: {
    items: Object
  },

  data: () => ({
    info: {}
  }),

  created() {
    this.info = this.items
  }
}
</script>