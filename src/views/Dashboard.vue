<template>
  <div class="card">
    <Doughnut :data="chartData" :options="options" />
  </div>
  <div>
    <Bar :data="chartDataBar" :options="options" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Doughnut,
    Bar
  },
  data() {
    return {
      response: null,
      responseClients: null,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    axios
      .get('http://localhost:8000/api/dashboard/species')
      .then((response) => {
        this.response = response.data
      })
      .catch(() => alert('Não foi possivel listar'))

    axios
      .get('http://localhost:8000/api/dashboard/clients')
      .then((response) => {
        this.responseClients = response.data
      })
      .catch(() => alert('Não foi possivel listar'))
  },
  methods: {
    generateHexColors(numColors) {
      var colors = []
      for (var i = 0; i < numColors; i++) {
        // Gerando um valor hexadecimal aleatório de 24 bits
        var color = '#'
        for (var j = 0; j < 6; j++) {
          color += Math.floor(Math.random() * 16)
            .toString(16)
            .toUpperCase()
        }
        colors.push(color)
      }
      console.log(colors)
      return colors
    },
    getMonthName(monthNumber) {
      var monthName
      switch (monthNumber) {
        case 1:
          monthName = 'Janeiro'
          break
        case 2:
          monthName = 'Fevereiro'
          break
        case 3:
          monthName = 'Março'
          break
        case 4:
          monthName = 'Abril'
          break
        case 5:
          monthName = 'Maio'
          break
        case 6:
          monthName = 'Junho'
          break
        case 7:
          monthName = 'Julho'
          break
        case 8:
          monthName = 'Agosto'
          break
        case 9:
          monthName = 'Setembro'
          break
        case 10:
          monthName = 'Outubro'
          break
        case 11:
          monthName = 'Novembro'
          break
        case 12:
          monthName = 'Dezembro'
          break
        default:
          monthName = 'Mês inválido'
      }
      return monthName
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.response ? this.response.map((item) => item.name) : [],
        datasets: [
          {
            backgroundColor: this.generateHexColors(this.response ? this.response.length : 0),
            data: this.response ? this.response.map((item) => item.count) : []
          }
        ]
      }
    },
    chartDataBar() {
      return {
        labels: this.responseClients
          ? this.responseClients.map((item) => this.getMonthName(Number(item.mes)))
          : [],
        datasets: [
          {
            label: 'Quantidade de clientes',
            backgroundColor: '#cba23f',
            data: this.responseClients ? this.responseClients.map((item) => item.count) : []
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  width: 50%;
}
</style>