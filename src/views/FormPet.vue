<template>
  <v-snackbar v-model="success" color="success" location="top right" timeout="3000">
    Pet cadastrado com sucesso!
  </v-snackbar>

  <form @submit.prevent="handleSubmit">
    <v-card width="80%" class="mx-auto px-6 mt-4" title="Cadastro de pet">
      <v-alert
        v-if="showError"
        color="error"
        closable
        title="Houve um erro ao cadastrar o pet"
        class="mb-8"
      ></v-alert>

      <v-row class="mt8">
        <v-col cols="12" md="8">
          <v-text-field
            label="Nome"
            variant="outlined"
            v-model="name"
            :error-messages="errors.name"
            data-test="input-name"
          />
        </v-col>
        <v-col cols="12" md="2" sm="6">
          <v-text-field
            label="Idade"
            type="number"
            variant="outlined"
            v-model="age"
            :error-messages="errors.age"
            data-test="input-age"
          />
        </v-col>
        <v-col cols="12" md="2" sm="6">
          <v-text-field
            label="Peso"
            type="number"
            variant="outlined"
            v-model="weight"
            :error-messages="errors.weight"
            data-test="input-weight"
          />
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
            :error-messages="errors.size"
            data-test="select-size"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Espécie"
            :items="itemsSpecies"
            variant="outlined"
            placeholder="Selecione um espécie"
            v-model="specie_id"
            item-title="name"
            item-value="id"
            :error-messages="errors.specie_id"
            data-test="select-specie"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Raça"
            :items="itemsRaces"
            variant="outlined"
            placeholder="Selecione um raça"
            v-model="race_id"
            item-title="name"
            item-value="id"
            :error-messages="errors.race_id"
            data-test="select-race"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            label="Descrição"
            variant="outlined"
            v-model="description"
            data-test="input-description"
          />
        </v-col>
      </v-row>

      <v-card-actions class="d-flex justify-end">
        <v-btn color="orange" type="submit" variant="flat" data-test="submit-button">
          Cadastrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
import { optionsSize } from '../constants/pet.constants'

import SpecieService from '../services/SpecieService'
import RaceService from '../services/RaceService'
import PetService from '../services/PetService'

import { schemaPetForm } from '../validations/pet.validations'
import { captureErrorYup } from '../utils/captureErrorsYup'
import * as yup from 'yup'

export default {
  data() {
    return {
      name: '',
      age: 1,
      weight: 1,
      size: '',
      specie_id: '',
      race_id: '',
      description: '',

      itemsSize: optionsSize,
      itemsSpecies: [],
      itemsRaces: [],
      success: false,
      errors: {},
      showError: false
    }
  },
  mounted() {
    SpecieService.getAllSpecies()
      .then((data) => {
        this.itemsSpecies = data
      })
      .catch(() => alert('Houve um erro ao buscar as opções'))

    RaceService.getAllRaces().then((data) => {
      this.itemsRaces = data
    })
  },
  methods: {
    handleSubmit() {
      try {
        const body = {
          name: this.name,
          age: this.age,
          size: this.size,
          race_id: this.race_id,
          specie_id: this.specie_id,
          weight: this.weight,
          description: this.description
        }

        schemaPetForm.validateSync(body, { abortEarly: false })

        PetService.createPet(body)
          .then(() => {
            this.success = true

            this.name = ''
            this.age = 1
            this.weight = 1
            this.size = ''
            this.specie_id = ''
            this.race_id = ''
          })
          .catch(() => {
            this.showError = true
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors = captureErrorYup(error)
        }
        // captura os erros lançados pela validação
      }
    }
  }
}
</script>

<style scoped>
</style>