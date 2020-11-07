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
        <v-btn class="mx-2" small fab dark color="cyan darken-2" @click.stop="$emit('dial')">
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
          <profile-logs-panels v-for="log in logs" :key="log.id" :info="{ id: log.id, date: log.date, comment: log.comment, index: log.id}" @del-log="delLog" />
        </v-expansion-panels>
      </div>
    </v-card>
</template>

<script>
import axios from '../../http-common'
import profileLogsPanels from './ProfileLogsPanels'

export default {
  props: {
    contact_id: Number,
    new_log: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    profileLogsPanels
  },

  computed: {
    fullLogs() {
      if (this.new_log){
        let full= this.logs;
        full.unshift(this.new_log)
        this.$emit('newLogDone');
        return full;
      }else{
        return this.logs;
      }
    }
  },

  watch: {
    fullLogs: function (full) {
      this.logs = full;
      console.log(this.logs);
    }
  },

  data: () => ({
    panel: [],
    logs: [],
    profile: null,
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
    delLog(event) {
      const logToDelete = this.logs.find(log => log.id === event);
      const indexToDelete = this.logs.indexOf(logToDelete);
      this.$delete(this.logs, indexToDelete);
    }
  },

  mounted() {
    this.profile = this.contact_id
    axios
    .get(`/admin/contacts/logs/${this.profile}`)
    .then(response => {
      this.logs = response.data;
    })
  },
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
