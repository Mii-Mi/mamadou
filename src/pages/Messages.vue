<template>
  <v-container class="grey lighten-2">
    <v-row justify="center">
      <v-col md="9" sm="12">
          <v-card
            :elevation="2"
            class="mx-auto"
          >
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(message,i) in messages"
                :key="i"
              >
                <v-expansion-panel-header>De {{message.author}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{message.content}}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../http-common'

export default {
  components: {
  },
  data:() => ({
    messages: []
  }),
  created() {
    axios
    .get('/admin/messages')
    .then(response => {
      this.messages = response.data
    })
  }

}
</script>