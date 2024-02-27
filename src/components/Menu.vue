<template>
  <v-navigation-drawer :rail="rail" permanent>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="name"
        :subtitle="profile"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>

       <router-link to="/dashboard">
        <v-list-item prepend-icon="mdi-folder" title="Dashboard" value="dashboard"> </v-list-item>
      </router-link>

      <router-link to="/home">
        <v-list-item prepend-icon="mdi-folder" title="Home" value="home"> </v-list-item>
      </router-link>

      <router-link to="/pets/novo">
        <v-list-item prepend-icon="mdi-star" title="Novo pet" value="pets"> </v-list-item>
      </router-link>

      <router-link to="/veterinarios" v-if="permissions?.includes('get-profissionals')">
        <v-list-item prepend-icon="mdi-star" title="Profissionais" value="profissionals"> </v-list-item>
      </router-link>

      <router-link to="/usuarios" v-if="permissions?.includes('create-users')">
        <v-list-item prepend-icon="mdi-account" title="Usuários" value="users"> </v-list-item>
      </router-link>

      <router-link to="/adocoes">
        <v-list-item prepend-icon="mdi-star" title="Adoções" value="adoptions"> </v-list-item>
      </router-link>

    </v-list>
    <div class="pa-8">
    <v-btn
      :loading="loading"
      @click="handleLogout"
      block
    >
     Saindo
      <template v-slot:loader>
        <v-progress-linear indeterminate></v-progress-linear>
      </template>
    </v-btn>
    </div>

  </v-navigation-drawer>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data(){
    return {
      permissions: JSON.parse(localStorage.getItem("@permissions_petshop")),
      name: localStorage.getItem("@name"),
      profile: localStorage.getItem("@profile"),
      loading: false
    }
  },
  methods: {
      handleLogout() {
        AuthenticationService.logout()
        .then(() => {
            this.$router.push('/')
            localStorage.clear() // apagar tudo do localstorage desse dominio
        })
      }
    }
}
</script>
