<template>
  <v-layout>
    <Menu v-if="this.$route.path !== '/' && !this.$route.path.includes('/adocoes/documentos')"/>
    <v-main>
       <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script>
 import Menu from './components/Menu.vue'

export default {
  components: {
    Menu
  }
}

</script>

