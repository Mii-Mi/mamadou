<template>
  <v-flex xs12 sm4 offset-sm1>
    <v-card flat class="transparent">
      <v-card-title primary-title class="layout justify-center">
        <div class="headline">Coordonnées</div>
      </v-card-title>
      <v-card-text>
        {{ info.topo }}
      </v-card-text>
      <v-list class="transparent">
        <v-list-item>
          <v-list-item-action>
            <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ info.phone }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ info.adress }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ info.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      info: {...this.item}
    }
  }
}
</script>