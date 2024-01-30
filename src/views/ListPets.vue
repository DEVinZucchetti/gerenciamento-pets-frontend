<template>
  <v-container>
    <h1>Lista de pets</h1>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Raça</th>
          <th class="text-left">Porte</th>
          <th class="text-left">Idade</th>
          <th class="text-left">Peso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
          <td>{{ pet.pet_name }}</td>
          <td>{{ pet.race.name }}</td>
           <td>{{ this.translateWeight(pet.size) }}</td>
            <td>{{ pet.age }}</td>
             <td>{{ pet.weight }}</td>
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
       switch(name) {
        case 'SMALL': {
          return 'PEQUENO'
        }
        case 'MEDIUM': {
          return 'MÉDIO'
        }
        case 'LARGE' : {
          return 'GRANDE'
        }
         case 'EXTRA_LARGE' : {
          return 'GIGANTE'
        }
        default: {
          return name
        }
       }
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