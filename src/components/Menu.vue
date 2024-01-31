<template>
  <v-navigation-drawer :rail="rail" permanent>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Douglas Cavalcante"
        subtitle="doug@gmail.com"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/">
        <v-list-item prepend-icon="mdi-folder" title="Home" value="myfiles"> </v-list-item>
      </router-link>

      <router-link to="/pets/novo">
        <v-list-item prepend-icon="mdi-star" title="Novo pet" value="starred"> </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

