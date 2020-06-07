<template>
  <div>
    <profile-logs-card :contact_id="contactId" :new_log="newLog[0]" @newLogDone="resetNewLog" @dial="dialog=true"/>
    <form-profile-log v-model="dialog" :contactid="contactId" @new-log="addLog"/>
  </div>
</template>

<script>
import formProfileLog from './FormProfileLog'
import profileLogsCard from './ProfileLogsCard'

export default {
  props: {
    contactId: Number
  },

  components: {
    formProfileLog,
    profileLogsCard,
  },

  data: () => ({
    panel: [],
    newLog: [],
    dialog: false
  }),

  methods: {
    addLog(event) {
      this.newLog.unshift(event);
    },
    resetNewLog() {
      this.newLog.splice(0);
    }
  }
}
</script>
