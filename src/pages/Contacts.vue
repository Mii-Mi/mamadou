<template>
  <v-container class="grey lighten-2">
    <v-row justify="center">
      <v-col cols="12" md="9">
          <v-btn block color="cyan darken-2" dark @click.stop="dialog = true">Créer contact</v-btn>
          <p></p>
          <v-card
            :elevation="2"
            class="mx-auto"
          >
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(contact,i) in contacts"
                :key="i"
              >
                <v-expansion-panel-header>{{contact.firstname}} {{contact.lastname}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <profile-card :items="{age: contact.age, adress: contact.adress, email: contact.email, telephone: contact.telephone}" />
                    </v-col>
                    <v-col cols="12" md="8">
                      <profile-logs-card :contactId="contact.id" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <form-profile v-model="dialog" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import profileCard from '../components/ProfileCard'
import profileLogsCard from '../components/ProfileLogsCard'
import formProfile from '../components/FormProfile'
import axios from '../../http-common'

export default {
  components: {
    profileCard,
    profileLogsCard,
    formProfile
  },
  data:() => ({
    contacts: [],
    dialog: false
  }),
  created() {
    axios
    .get('/admin/contacts')
    .then(response => {
      this.contacts = response.data
    })
  }

}
</script>