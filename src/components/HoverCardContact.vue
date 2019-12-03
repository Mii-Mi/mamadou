<template>
  <v-col
    :cols="cols"
    :md="md"
  >
    <v-hover
      v-slot:default="{ hover }"
    >
      <v-card
        :elevation="hover ? 12 : 2"
        class="mx-auto"
      >
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
        <v-fab-transition>
          <v-btn
            v-if="hover"
            color="cyan"
            dark
            small
            absolute
            bottom
            right
            fab
            @click.stop="dialog = true"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-fab-transition>
        <form-dialog v-model="dialog" :item="{phone: info.phone, adress: info.adress, email: info.email}" />
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import formDialog from '../components/FormDialog'

export default {
  props: {
    mobile: Number,
    desktop: Number,
    item: {}
  },
  data() {
    return {
      cols: this.mobile,
      md: this.desktop,
      info: {...this.item},
      dialog: false
    }
  },
  components: {
    formDialog
  }
}
</script>
