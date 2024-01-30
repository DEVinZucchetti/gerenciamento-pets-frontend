<template>
  <v-layout>
    <Menu />
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

