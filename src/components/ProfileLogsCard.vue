<template>
  <v-card
    :elevation="2"
    class="mx-auto"
    height="100%"
  >
    <v-toolbar
    dense
    color="cyan lighten-4"
    flat
    >
      <v-toolbar-title>Suivi</v-toolbar-title>
      <v-spacer />
        <v-btn class="mx-2" small fab dark color="cyan darken-2" @click.stop="dialog = true">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab small color="cyan lighten-4" @click="none" title="tout refermer">
          <v-icon dark>mdi-chevron-double-up</v-icon>
        </v-btn>
        <v-btn fab small color="cyan lighten-4" @click="all" title="tout déplier">
          <v-icon dark>mdi-chevron-double-down</v-icon>
        </v-btn>
    </v-toolbar>
    <div>
      <v-expansion-panels
        v-model="panel"
        multiple
      >
        <profile-logs-panels v-for="(log, i) in logs" :key="i" :info="{ id: log.id, date: log.date, comment: log.comment }" />
      </v-expansion-panels>
    </div>
    <form-profile-log v-model="dialog" :contactid="contactId" />
  </v-card>
</template>

<script>
import axios from '../../http-common'
import formProfileLog from './FormProfileLog'
import profileLogsPanels from './ProfileLogsPanels'

export default {
  props: {
    contactId: Number
  },

  components: {
    formProfileLog,
    profileLogsPanels
  },

  data: () => ({
    panel: [],
    logs: [],
    profile: null,
    dialog: false,
  }),

  methods: {
    // Create an array the length of our items
    // with all values as true
    all () {
      this.panel = [...Array(this.logs.length)].map((k,i) => i)
    },
    // Reset the panel
    none () {
      this.panel = []
    },
  },

  created() {
    this.profile = this.contactId
    axios
    .get(`/admin/contacts/logs/${this.profile}`)
    .then(response => {
      this.logs = response.data
    })
  }
}
</script>

<style>
  img{
    max-width: 100%;
  }
  .rbut{
    margin-right: 40px;
  }
  .lbut{
    margin-right: 80px;
  }
</style>