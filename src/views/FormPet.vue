<template>
  <v-card width="80%" class="mx-auto px-6 mt-4" title="Cadastro de pet">
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field label="Nome" variant="outlined" v-model="name" />
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field label="Idade" type="number" variant="outlined" v-model="age" />
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <v-text-field label="Peso" type="number" variant="outlined" v-model="weight" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-select
          label="Tamanho"
          :items="itemsSize"
          variant="outlined"
          placeholder="Selecione um item"
          v-model="size"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          label="Espécie"
          :items="itemsSpecies"
          variant="outlined"
          placeholder="Selecione um espécie"
          v-model="specie"
          item-title="name"
          item-value="id"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          label="Raça"
          :items="itemsRaces"
          variant="outlined"
          placeholder="Selecione um raça"
          v-model="race"
          item-title="name"
          item-value="id"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { optionsSize } from '../constants/pet.constants'
import SpecieService from '../services/SpecieService'
import RaceService from '../services/RaceService'

export default {
  data() {
    return {
      name: '',
      age: 1,
      weight: 1,
      size: '',
      specie: '',
      race: '',

      itemsSize: optionsSize,
      itemsSpecies: [],
      itemsRaces: []
    }
  },
  mounted() {
    SpecieService.getAllSpecies()
      .then((data) => {
        this.itemsSpecies = data
      })
      .catch(() => alert('Houve um erro ao buscar as opções'))

      RaceService.getAllRaces()
      .then((data) => {
        this.itemsRaces = data
      })
  }
}
</script>

<style scoped>
</style>