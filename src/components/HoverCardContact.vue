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
              <v-list-item-title v-if="info[0]">{{ info[0].phone }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-if="info[0]">{{ info[0].adress }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-if="info[0]">{{ info[0].email }}</v-list-item-title>
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
        <form-dialog v-if="info[0]" v-model="dialog" :item="{id: info[0].id, topo: info[0].topo, phone: info[0].phone, adress: info[0].adress, email: info[0].email}" />
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import formDialog from '../components/FormDialog'
import axios from '../../http-common'

export default {
  props: {
    mobile: Number,
    desktop: Number,
  },
  data() {
    return {
      cols: this.mobile,
      md: this.desktop,
      info: [],
      dialog: false
    }
  },
  components: {
    formDialog
  },
  mounted() {
    axios
    .get(`/admin/articles/contact`)
    .then(response => {
      this.info = response.data
      }
    )
  }
}
</script>
