<template>
  <v-container class="grey lighten-2">
    <v-row>
      <hover-card-title :place="1" />
    </v-row>

    <v-row>
      <hover-card :mobile='12' :desktop='4' :place="1" />
      <hover-card :mobile='12' :desktop='4' :place="2" />
      <hover-card :mobile='12' :desktop='4' :place="3" />
    </v-row>

    <v-row>
      <hover-card-title :place="2" />
    </v-row>

    <v-row>
      <hover-card :mobile='12' :desktop='6' :place="4" />
      <hover-card-contact :mobile='12' :desktop='6'/>
    </v-row>
  </v-container>
</template>

<script>
import hoverCard from '../components/HoverCard'
import hoverCardContact from '../components/HoverCardContact'
import hoverCardTitle from '../components/HoverCardTitle'

export default {
  components: {
    hoverCard,
    hoverCardContact,
    hoverCardTitle
  }
}
</script>