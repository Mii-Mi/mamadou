<template>
  <v-flex xs12 sm4 offset-sm1>
    <v-card flat class="transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline">Coordonnées</div>
      </v-card-title>
      <v-card-text v-if="info[0]">
        {{ info[0].topo }}
      </v-card-text>
      <v-list class="transparent">
        <v-list-item>
          <v-list-item-action>
            <v-icon class="light-green--text text--darken-4">mdi-phone</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-if="info[0]">{{ info[0].phone }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon class="light-green--text text--darken-4">mdi-map-marker</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-if="info[0]">{{ info[0].adress }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon class="light-green--text text--darken-4">mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-if="info[0]">{{ info[0].email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <a v-if="info[0]" :href="info[0].fblink" style="text-decoration: none" target="_blank">
          <v-list-item link class="fb">
            <v-list-item-action>
              <v-icon class="light-green--text text--darken-4">mdi-facebook-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ma page Facebook</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </a>
        
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import axios from '../../http-common'

export default {
  data () {
    return {
      info: [],
    }
  },
  mounted() {
    axios
    .get(`/articles/contact`)
    .then(response => {
      this.info = response.data
      }
    )
  }
}
</script>

<style>
  .fb:hover{
    background-color:#DCEDC8;
  }
</style>