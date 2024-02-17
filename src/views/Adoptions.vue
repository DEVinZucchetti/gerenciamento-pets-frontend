<template>
  <v-container>
    <div class="d-flex justify-space-between mb-8">
      <h1>Lista de adoções</h1>
    </div>
    <form @submit.prevent="handleSearch">
      <v-row>
        <v-col cols="12">
          <v-text-field
            placeholder="Pesquise por uma informação"
            variant="outlined"
            v-model="text"
            data-test="input-text"
          />
        </v-col>
      </v-row>
    </form>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="text-left">Pet</th>
          <th class="text-left">Nome</th>
          <th class="text-left">CPF</th>
          <th class="text-left">Contato</th>
          <th class="text-left">email</th>
           <th class="text-left">Aprovar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="adoption in adoptions" :key="adoption.id" data-test="row-table">
          <td>{{ adoption.pet.name }}</td>
          <td>{{ adoption.name }}</td>
          <td>{{ adoption.cpf }}</td>
          <td>{{ adoption.contact }}</td>
          <td>{{ adoption.email }}</td>
           <td><button @click="handleApprove(adoption.id)">Aprovar</button></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import AdoptionService from '../services/AdoptionService'

export default {
  data() {
    return {
      text: '',
      adoptions: []
    }
  },
  methods: {
    handleSearch() {
      this.getList()
    },
    getList() {
      AdoptionService.getAllAdoptions()
        .then((data) => {
          this.adoptions = data
        })
        .catch(() => alert('Houve um erro ao buscar as adocoes'))
    },
    handleApprove(adoptionId){
      AdoptionService.approve({adoption_id: adoptionId })
      .then(() => {
        alert("Aprovado com sucesso")
      })
      .catch(() => alert("houve um erro"))
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