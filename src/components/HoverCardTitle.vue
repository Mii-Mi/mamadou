<template>
  <v-col
    :cols="12"
  >
    <v-hover
      v-slot:default="{ hover }"
    >
      <v-card
        :elevation="hover ? 12 : 2"
        class="mx-auto"
      >
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-center" v-if="info[0]">{{ info[0].big }}</div>
        </v-card-title>
        <v-card-text>
          <div class="text-center"><p v-if="info[0]">{{ info[0].small }}</p></div>
        </v-card-text>
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
        <form-dialog v-model="dialog" v-if="info[0]" :item="{id: info[0].id, big: info[0].big, small: info[0].small, type:'titles'}"></form-dialog>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
import formDialog from '../components/FormDialog'
import axios from '../../http-common'

export default {

  props:{
    place: Number
  },
  data() {
    return {
      position: null,
      info: [],
      dialog: false
    }
  },
  components:{
    formDialog
  },
  mounted() {
    this.position = this.place
    axios
    .get(`/admin/articles/titles/${this.position}`)
    .then(response => {
      this.info = response.data
      }
    )
  }
}
</script>
