<template>
  <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <p>{{ log.date }}</p>
            <v-fab-transition>
              <v-btn
                class="lbut"
                v-if="open"
                color="cyan"
                dark
                x-small
                absolute
                right
                fab
                @click.stop="dialog = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-fab-transition>
            <v-fab-transition>
              <v-btn
                class="rbut"
                v-if="open"
                color="red darken-2"
                dark
                x-small
                absolute
                right
                fab
                @click.stop="del()"
              >
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-html="log.comment"></div>
            <form-profile-log-edit v-model="dialog" :val="{id: log.id, content: log.comment}" />
          </v-expansion-panel-content>
        </v-expansion-panel>
</template>

<script>
import formProfileLogEdit from './FormProfileLogEdit'
import axios from '../../http-common'

export default {
  props:{
    info: Object
  },

  components: {
    formProfileLogEdit
  },

  data: () => ({
    log: {
      id: null,
      date: '',
      comment: ''
    },
    dialog: false
  }),

  methods:{
    del() {
      axios
          .delete(`/admin/contacts/logs/delete/${this.log.id}`)
          .then((resp) => {
            localStorage.setItem('msg', resp.data.msg)
            setTimeout(() => {
              return this.$flash.$emit('msg')
            }, 500)
          })
    }
  },

  created() {
    this.log = this.info
  }
}
</script>