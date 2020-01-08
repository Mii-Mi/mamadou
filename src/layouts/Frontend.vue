<template>
  <v-app light>
    <v-content>
      <section>
        <snackbar />
        <form-contact v-model="dialog" />
        <v-parallax src="../assets/foretdebrocliande1.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/amazonite1.png" alt="amazonite.png" height="200">
            <h1 class="blue-grey--text text--darken-4 mb-2 display-1 text-center">{{ title }}</h1>
            <div class="subheading mb-4 text-center blue-grey--text text--darken-4">Magnétiseur, rebouteux ... et hypnose</div>
            <v-btn
              class="mt-12"
              color="light-green darken-4"
              dark
              large
              @click.stop="dialog=true"
            >
              Me contacter
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-12"
          align-center
        >
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 v-if="titles[0]" class="headline">{{ titles[0].big }}</h2>
              <span v-if="titles[0]" class="subheading">
                {{ titles[0].small}}
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <posts :place="1"/>
                <posts :place="2"/>
                <posts :place="3"/>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="../assets/foretdebrocliande2.jpg" height="380">
          <v-layout column align-center justify-center>
            <div v-if="titles[1]" class="headline teal--text text--darken-4 mb-4 text-center">{{ titles[1].big }}</div>
            <em v-if="titles[1]" class="teal--text text--darken-4">{{ titles[1].small }}</em>
            <v-btn
              class="mt-12"
              color="light-green darken-4"
              dark
              large
            >
              Me contacter
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <who-am :place="4"/>
            <contact-info />
          </v-layout>
        </v-container>
      </section>

      <v-footer color="light-green darken-1">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4">
              Propulsé avec
              <v-icon class="red--text">mdi-heart</v-icon>
              par <a class="white--text" href="">Cécile</a>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4 text-right">
              <a class="white--text" @click="admin()">admin</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import http from "../../http-common"
import Snackbar from '../components/Snackbar'
import Posts from '../components/Posts'
import WhoAm from '../components/WhoAm'
import ContactInfo from '../components/ContactInfo'
import FormContact from '../components/FormContact'

export default {
  name: 'Welcome',

  components: {
    Snackbar,
    Posts,
    WhoAm,
    ContactInfo,
    FormContact,
  },
  data: () => {
    return {
      title: 'Seb et ses bienfaits',
      titles: [],
      post: [],
      dialog: false
    }
  },
  methods: {
    admin() {
      this.$router.push('/admin')
    }
  },
  created() {
    http
    .get('/')
    .then(response => {
      this.titles = response.data
      }
    )    
  }
};
</script>

<style>
  h1, .subheading {
    text-shadow: 2px 2px 3px white
  }
</style>