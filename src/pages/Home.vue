<template>
  <v-container class="grey lighten-2">
    <v-row>
      <hover-card-title v-if="post[0]" :mobile='12' :item="{big: post[0].big, small: post[0].small}" />
    </v-row>

    <v-row>
      <hover-card v-if="post[0]" :mobile='12' :desktop='4' :item="{title: post[0].title, content: post[0].content, icon: post[0].icon}" />
      <hover-card v-if="post[1]" :mobile='12' :desktop='4' :item="{title: post[1].title, content: post[1].content, icon: post[1].icon}" />
      <hover-card v-if="post[2]" :mobile='12' :desktop='4' :item="{title: post[2].title, content: post[2].content, icon: post[2].icon}" />
    </v-row>

    <v-row>
      <hover-card-title v-if="post[4]" :mobile='12' :item="{big: post[4].big, small: post[4].small}" />
    </v-row>

    <v-row>
      <hover-card v-if="post[3]" :mobile='12' :desktop='6' :item="{title: post[3].title, content: post[3].content}" />
      <hover-card-contact v-if="post[0]" :item="{topo: post[0].topo, phone: post[0].phone, adress: post[0].adress, email: post[0].email}" :mobile='12' :desktop='6'/>
    </v-row>
  </v-container>
</template>

<script>
import http from "../../http-common"
import hoverCard from '../components/HoverCard'
import hoverCardContact from '../components/HoverCardContact'
import hoverCardTitle from '../components/HoverCardTitle'

export default {
  components: {
    hoverCard,
    hoverCardContact,
    hoverCardTitle
  },
  data() {
    return {
      post: []
    }
  },
  mounted() {
    http
    .get('/')
    .then(response => {
      this.post = response.data
      }
    )
    // .catch(error => {
    //   console.log(error)
    // })
  }
}
</script>