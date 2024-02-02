<template>
  <v-container>
    <div class="d-flex justify-space-between mb-8">
      <h1>Lista de veterinários</h1>
      <v-btn color="orange" type="submit" variant="flat" @click="dialog = true"> Novo </v-btn>
    </div>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Especialidade</th>
          <th class="text-left">Registro</th>
        </tr>
      </thead>
      <tbody></tbody>
    </v-table>
  </v-container>

  <v-row justify="center">
    <v-dialog v-model="dialog" width="1024px">
      <form @submit.prevent="handleSubmit">
        <v-card class="pa-8">
          <v-card-title>
            <span class="text-h5">Cadastro de veterinário</span>
          </v-card-title>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Nome" variant="outlined" v-model="name" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="CPF" variant="outlined" v-model="cpf" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Contato" variant="outlined" v-model="contact" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Email" variant="outlined" v-model="email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Especialidade" variant="outlined" v-model="speciality" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Nº do registro" variant="outlined" v-model="register" />
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
import ProfessionalService from '../services/ProfessionalService'

export default {
  data() {
    return {
      dialog: false,
      name: '',
      email: '',
      cpf: '',
      contact: '',
      speciality: '',
      register: ''
    }
  },
  methods: {
    handleSubmit() {
      ProfessionalService.createProfessional({
        name: this.name,
        cpf:  this.cpf,
        contact:  this.contact,
        email:  this.email,
        speciality: this.speciality,
        register:  this.register,
      })
      .then(() => {
        alert("Cadastrado com sucesso")
        this.dialog = false
      })
      .catch(() => {
        alert("Erro ao cadastrar")
      })
    }
  },
  mounted() {}
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