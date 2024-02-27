<template>
  <div class="card">
    <Doughnut :data="chartData" :options="options" />
  </div>
  <div class="card">
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    Doughnut
  },
  data() {
    return {
      response: null,
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: []
          }
        ]
      },
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
        //  const labels = response.data.map(item => item.name)
        //  const values = responsedata.map(item => item.count)
        this.response = response.data
      })
      .catch(() => alert('Não foi possivel listar'))
  },
  computed: {
    chartData() {
      return {
        labels: this?.response?.map((item) => item.name),
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: this?.response?.map((item) => item.count)
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