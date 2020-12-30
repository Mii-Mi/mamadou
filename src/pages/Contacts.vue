<template>
  <v-container
    class="grey lighten-2"
  >
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-btn block color="cyan darken-2" dark @click.stop="dialog = true">Créer contact</v-btn>
        <p></p>
        <contacts-card :new_contact="newContact[0]" @newContactDone="resetNewContact"/>
        <form-profile v-model="dialog" @new-contact="addContact" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import contactsCard from '../components/ContactsCard'
import formProfile from '../components/FormProfile'

export default {
  components: {
    contactsCard,
    formProfile
  },
  data:() => ({
    dialog: false,
    newContact: []
  }),
  methods: {
    addContact(event) {
      this.newContact.unshift(event);
    },
    resetNewContact() {
      this.newContact.splice(0);
    }
  }
}
</script>
