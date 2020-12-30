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
    <v-btn class="mx-2" small fab dark color="cyan" @click.stop="dialog = true">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
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
        <v-list-item three-line>
          <v-list-item-icon>
            <v-icon>fas fa-map-marker-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>adresse :</v-list-item-title>
            <v-list-item-subtitle>{{info.adress}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-icon>
            <v-icon>fas fa-mail-bulk</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>courriel :</v-list-item-title>
            <v-list-item-subtitle>{{info.email}}</v-list-item-subtitle>
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
    <form-profile-edit v-model="dialog" :val="{ id:info.id, firstName:info.firstName, lastName:info.lastName, age:info.age, adress:info.adress, email:info.email, telephone:info.telephone }" @updated-profile="update" />
  </v-card>
</template>

<script>
import formProfileEdit from './FormProfileEdit'

export default {
  components: {
    formProfileEdit
  },

  props: {
    items: Object
  },

  data: () => ({
    info: {},
    dialog: false
  }),

  methods: {
    update(event){
      this.info = event
      this.$emit('updated-profile', this.info)
    }
  },

  created() {
    this.info = this.items
  }
}
</script>
