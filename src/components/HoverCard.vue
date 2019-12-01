<template>
  <v-hover
    v-slot:default="{ hover }"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :disabled="disabled"
    :value="value"
  >
    <v-card
      :elevation="hover ? 12 : 2"
      height="300"
      class="mx-auto"
    >
      <v-card-text class="my-4 text-center title">Hover over me!</v-card-text>
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
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-fab-transition>
    </v-card>
  </v-hover>
</template>
