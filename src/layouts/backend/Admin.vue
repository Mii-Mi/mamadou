<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="cyan"
      dark
    >
      <v-spacer />

      <v-toolbar-title>Application</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <!-- Here my container component -->
      <home />
      <!-- End of my container component -->
    </v-content>

    <v-footer
      color="cyan"
      app
    >
      <v-spacer />

      <span class="white--text ml-4">
              Propulsé avec
              <v-icon class="red--text">mdi-heart</v-icon>
              par <a class="white--text" href="" target="_blank">Cécile</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>

  import home from '../../pages/Home'

  export default {

    name: 'Admin',

    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      home
    }
  }
</script>