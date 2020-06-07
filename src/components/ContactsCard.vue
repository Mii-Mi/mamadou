<template>
  
  <v-card
    :elevation="2"
    class="mx-auto"
  >
    <!-- <pre>{{new_contact}}</pre> -->
    <v-expansion-panels 
      focusable
      v-model="panel"
    >
      <v-expansion-panel
        v-for="(contact, i) in fullContacts"
        :key="i"
      >
        <v-expansion-panel-header v-slot="{ open }">
          <v-layout row wrap>
            <v-flex xs12>
              <div class="ml-4">
                {{contact.firstname}} {{contact.lastname}}
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <div class="ml-4 text-right" style="padding-right: 20px">
                <v-fab-transition>
                  <v-btn v-if="open" class="mx-2" small fab dark color="red darken-2" @click.stop="del(contact.id, i)">
                    <v-icon dark>mdi-delete-forever</v-icon>
                  </v-btn>
                </v-fab-transition>
              </div>
            </v-flex>
          </v-layout>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <profile-card :items="{id: contact.id, firstName: contact.firstname, lastName: contact.lastname, age: contact.age, adress: contact.adress, email: contact.email, telephone: contact.telephone}" />
              </v-col>
              <v-col cols="12" md="8">
                <profile-logs :contactId="contact.id" />
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import profileCard from './ProfileCard'
import profileLogs from './ProfileLogs'
import axios from '../../http-common'

export default {
  components: {
    profileCard,
    profileLogs
  },
  computed: {
    fullContacts() {
      let full = this.contacts;
      if (typeof this.new_contact !== 'undefined'){
        full.unshift(this.new_contact);
        this.$emit('newContactDone');
      }
      return full;
    }
  },
  props: {
    new_contact: {
      type: Object,
      default: () => {}
    }
  },
  data:() => ({
    contacts: [],
    panel: []
  }),
  methods: {
    del(id, i) {
      axios
      .delete(`/admin/contacts/${id}`)
      .then(resp => {
        if (resp.data.msg) {
          localStorage.setItem('msg', JSON.parse(JSON.stringify(resp.data.msg)))
          if (resp.status === 201) {
            this.$delete(this.fullContacts, i);
            this.panel = [];
          }
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
  created() {
    axios
    .get('/admin/contacts')
    .then(response => {
      this.contacts = response.data;
    })
  }
}
</script>