<template>
  <v-container>
    <div class="d-flex justify-space-between mb-8">
      <h1>Cartão de vacinação</h1>
      <v-btn color="orange" type="submit" variant="flat" @click="dialog = true">Aplicar vacina</v-btn>
    </div>


  </v-container>

  <v-row justify="center">
    <v-dialog v-model="dialog" width="1024px">
      <form @submit.prevent="handleSubmit">
        <v-card class="pa-8">
          <v-card-title>
            <span class="text-h5">Cadastro de vacina</span>
          </v-card-title>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Nome" variant="outlined" v-model="name" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                type="number"
                step="0,1"
                label="Dose"
                variant="outlined"
                v-model="email"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                label="Status"
                :items="itemsStatus"
                variant="outlined"
                placeholder="Selecione um status"
                v-model="status"
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
import { optionsStatus } from '@/constants/vaccine.constants'

export default {
  data() {
    return {
      dialog: false,
      name: '',
      dose: '',
      status: 'DONE',
      itemsStatus: optionsStatus
    }
  },
  methods: {
    handleSubmit() {
     
    },
    handleSearch() {
      this.getList()
    },
    getList() {
    }
  },
  mounted() {
    this.getList()
  }
}
</script>