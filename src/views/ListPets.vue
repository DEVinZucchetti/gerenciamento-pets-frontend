<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1>Lista de pets</h1>
      <v-btn color="orange" variant="flat" @click="handleExport"> Exportar dados </v-btn>
    </div>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Raça</th>
          <th class="text-left">Porte</th>
          <th class="text-left">Idade</th>
          <th class="text-left">Peso</th>
          <td class="text-ledt">Ações</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
          <td>{{ pet.pet_name }}</td>
          <td>{{ pet.race.name }}</td>
          <td>{{ this.translateWeight(pet.size) }}</td>
          <td>{{ pet.age }}</td>
          <td>{{ pet.weight }}</td>
          <td class="pa-4">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="handleRedirectToEdit(pet.id)">
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleDeletePet(pet.id)">
                  <v-list-item-title>Deletar</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleExportProfilePet(pet.id, pet.pet_name)">
                  <v-list-item-title>Exportar</v-list-item-title>
                </v-list-item>
                 <v-list-item @click="handleRedirectVaccination(pet.id)">
                  <v-list-item-title>Vacinação</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import PetService from '../services/PetService'

export default {
  data() {
    return {
      pets: []
    }
  },
  methods: {
    translateWeight(name) {
      switch (name) {
        case 'SMALL': {
          return 'PEQUENO'
        }
        case 'MEDIUM': {
          return 'MÉDIO'
        }
        case 'LARGE': {
          return 'GRANDE'
        }
        case 'EXTRA_LARGE': {
          return 'GIGANTE'
        }
        default: {
          return name
        }
      }
    },
    handleDeletePet(petId) {
      PetService.deleteOnePet(petId)
        .then(() => {
          alert('Deletado com sucesso')
          this.pets = this.pets.filter((item) => item.id !== petId)
        })
        .catch(() => alert('Erro ao deletar'))
    },
    handleRedirectToEdit(petId) {
      this.$router.push(`/pets/editar/${petId}`)
    },
    handleExport(){
      PetService.export(this.$route.params.id)
      .then(() => {
        alert("Baixado com sucesso. verifique sua pasta de downloads")
      })
      .catch(() => alert("Houve ao exportar a lista de pets"))
    },
    handleExportProfilePet(petId, petName) {
      PetService.exportProfilePet(petId, petName)
       .then(() => {
        alert("Baixado com sucesso. verifique sua pasta de downloads")
      })
      .catch(() => alert("Houve ao exportar a lista de pets"))
    },
    handleRedirectVaccination(petId) {
      this.$router.push(`/pets/${petId}/vacinacao`)
    }
  },
  mounted() {
    PetService.getAllPets(this.$route.params.id)
      .then((data) => {
        this.pets = data
      })
      .catch(() => {
        alert('Houve um erro')
      })
  }
}
</script>

<style scoped>
.header-table {
  background: tomato;
  color: #fff;
  font-weight: bold;
}

tbody tr:nth-child(2n) {
  background: #f2f0f0;
}
</style>