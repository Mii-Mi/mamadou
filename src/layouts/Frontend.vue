<template>
  <v-app light>
    <v-content>
      <section>
        <v-parallax src="../assets/hero.jpeg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/amazonite1.png" alt="amazonite.png" height="200">
            <h1 class="white--text mb-2 display-1 text-center">{{ title }}</h1>
            <div class="subheading mb-4 text-center">gri-gri, marabout, retour de l'amour</div>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href=""
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
              <h2 class="headline">{{ post[0].big }}</h2>
              <span class="subheading">
                {{ post[0].small}}
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <posts v-if="post[0]" :type="place[0]" :item="{title: post[0].title, content: post[0].content, icon: post[0].icon}"/>
                <posts v-if="post[1]" :type="place[1]" :item="{title: post[1].title, content: post[1].content, icon: post[1].icon}"/>
                <posts v-if="post[2]" :type="place[2]" :item="{title: post[2].title, content: post[2].content, icon: post[2].icon}"/>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="../assets/section.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-4 text-center">{{ post[4].big }}</div>
            <em>{{ post[4].small }}</em>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href=""
            >
              Me contacter
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <who-am v-if="post[3]" :item="{title: post[3].title, content: post[3].content}" />
            <contact-info v-if="post[0]" :item="{topo: post[0].topo, phone: post[0].phone, adress: post[0].adress, email: post[0].email}"/>
          </v-layout>
        </v-container>
      </section>

      <v-footer color="orange darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4">
              Propulsé avec
              <v-icon class="red--text">mdi-heart</v-icon>
              par <a class="white--text" href="" target="_blank">Cécile</a>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-4 text-right">
              <a class="white--text" href="https://lab.cecile.cf/#/admin" target="_blank">admin</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import http from "../../http-common"
import Posts from '../components/Posts'
import WhoAm from '../components/WhoAm'
import ContactInfo from '../components/ContactInfo'

export default {
  name: 'Welcome',

  components: {
    Posts,
    WhoAm,
    ContactInfo
  },

  data: () => {
    return {
      title: 'Sébastien guérisseur',
      place: ['left', 'center', 'right'],
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
};
</script>