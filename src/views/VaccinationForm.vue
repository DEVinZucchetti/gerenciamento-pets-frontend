<template>
  <v-container>
    <div class="d-flex justify-space-between mb-8">
      <h1>Cartão de vacinação</h1>
      <v-btn color="orange" type="submit" variant="flat" @click="dialog = true"
        >Aplicar vacina</v-btn
      >
    </div>

    <VCalendar expanded :attributes="vaccines" />
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
                step="0.1"
                label="Dose"
                variant="outlined"
                v-model="dose"
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
            <v-col cols="12" md="6">
              <v-select
                label="Veterinário"
                :items="itemsProfessionals"
                variant="outlined"
                placeholder="Selecione quem aplicou ?"
                v-model="professional_id"
              />
            </v-col>
          </v-row>
          <v-row class="mb-4">
            <VDatePicker expanded v-model="date" mode="date" :masks="masks" />
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
import VaccineService from '@/services/VaccineService'
import ProfessionalService from '@/services/ProfessionalService'
import { parseISO } from 'date-fns'

export default {
  data() {
    return {
      dialog: false,
      name: '',
      dose: '',
      status: 'DONE',
      date: new Date(),
      masks: {
        modelValue: 'YYYY-MM-DD'
      },
      itemsStatus: optionsStatus,
      itemsProfessionals: [],
      professional_id: '',
      vaccines: [
        /*
        {
          dates: new Date(2024, 1, 15, 3, 20),
          // bar: true,
          bar: 'green',
          highlight: 'red',
          popover: {
            label: '20:00 Vacina anti-raiva'
          }
        },
        */
      ]
    }
  },
  methods: {
    handleSubmit() {
      const body = {
        name: this.name,
        dose: this.dose,
        status: this.status,
        date: `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`,
        pet_id: this.$route.params.id,
        professional_id: this.professional_id
      }

      VaccineService.createVaccine(body)
        .then(() => {
          alert('Vacinado com sucesso')
          this.dialog = false
          this.getVaccines()
        })
        .catch(() => alert('Houve um erro'))
    },
    getProfessionals() {
      ProfessionalService.getAllProfessionals()
        .then((data) => {
          this.itemsProfessionals = data.map((item) => ({
            title: item.people.name,
            value: item.id
          }))
        })
        .catch(() => alert('Houve um erro ao pegar a lista'))
    },
    selectColor(status) {
      switch (status) {
        case 'DONE': {
          return 'green'
        }
        case 'PENDING': {
          return 'red'
        }
        default: {
          return 'yellow'
        }
      }
    },
    getVaccines() {
      VaccineService.getAllVaccinesByPet(this.$route.params.id)
        .then((data) => {
          this.vaccines = data.map((item) => ({
            id: item.id,
            dates: parseISO(item.date),
            // bar: item.status === 'DONE' ? 'green' : 'red',
            bar: this.selectColor(item.status),
            popover: {
              label: `${item.name} (${item.dose}ml)`
            }
          }))
        })
        .catch(() => alert('Houve'))
    }
  },
  mounted() {
    this.getProfessionals()
    this.getVaccines()
  }
}
</script>