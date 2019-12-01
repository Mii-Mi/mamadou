<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col
        cols="12"
      >
        <hover-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        md="4"
      >
        <hover-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <hover-card />
      </v-col>
    </v-row>

        <v-row>
      <v-col
        v-for="n in 2"
        :key="n"
        cols="12"
        md="6"
      >
        <hover-card/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import hoverCard from '../components/HoverCard'

export default {
  components: {
    hoverCard
  }
}
</script>