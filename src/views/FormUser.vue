<template>
  <v-container>
    <div class="d-flex justify-space-between mb-8">
      <h1>Lista de usuários</h1>
      <v-btn color="orange" type="submit" variant="flat" @click="dialog = true">Novo</v-btn>
    </div>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Perfil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" data-test="row-table">
          <td>{{ user.name }}</td>
          <td>{{ user.profile.name }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <v-row justify="center">
    <v-dialog v-model="dialog" width="1024px">
      <form @submit.prevent="handleSubmit">
        <v-card class="pa-8">
          <v-card-title>
            <span class="text-h5">Cadastro de usuário</span>
          </v-card-title>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Nome" variant="outlined" v-model="name" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Password"
                type="password"
                variant="outlined"
                v-model="password"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Email" variant="outlined" v-model="email" />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                label="Perfil"
                :items="itemsProfile"
                variant="outlined"
                placeholder="Selecione um item"
                v-model="profile_id"
              />
            </v-col>
          </v-row>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="orange" type="submit" variant="flat"> Cadastrar </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { optionsProfile } from '@/constants/user.contants'

export default {
  data() {
    return {
      users: [],
      dialog: false,
      name: '',
      email: '',
      password: '',
      profile_id: '',
      itemsProfile: optionsProfile
    }
  },
  methods: {
    handleSubmit() {
      AuthenticationService.createUser({
        name: this.name,
        email: this.email,
        password: this.password,
        profile_id: this.profile_id
      })
        .then(() => {
          alert('Cadastrado com sucesso')
          this.dialog = false
          this.getList()
        })
        .catch(() => {
          alert('Erro ao cadastrar')
        })
    },
    handleSearch() {
      this.getList()
    },
    getList() {
      AuthenticationService.getsUsers(this.text)
        .then((data) => {
          this.users = data
        })
        .catch(() => alert('Houve um error'))
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>
.header-table {
  background: orange;
  color: #fff;
  font-weight: bold;
}

tbody tr:nth-child(2n) {
  background: #f2f0f0;
}
</style>