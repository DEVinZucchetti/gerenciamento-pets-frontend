<template>
  <v-layout>
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
        <v-list-item prepend-icon="mdi-folder" title="Pets" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Sair" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
       <router-view></router-view>
    </v-main>
  </v-layout>
</template>

