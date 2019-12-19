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
        <v-btn class="mx-2" small fab dark color="cyan darken-2">
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
        <v-expansion-panel
          v-for="(log,i) in logs"
          :key="i"
        >
          <v-expansion-panel-header>{{ log.created }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{log.comment}}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card>
</template>

<script>
import axios from '../../http-common'

export default {
  props: {
    contactId: Number
  },

  data: () => ({
    panel: [],
    logs: [],
    profile: null
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