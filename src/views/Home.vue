<template>
  <h1 class="title">Espécies cadastradas</h1>
  <div class="list-species">
    <v-card v-for="specie in species" :key="specie.id" width="30%" :title="specie.name" link />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      species: []
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/species')
      .then((response) => {
        this.species = response.data
      })
      .catch((error) => {
        alert('Houve um erro')
      })
      .finally(() => {
        // ver exemplo
      })
  }
}
</script>

<style scoped>
 .title {
    margin-top: 20px;
    margin-left: 20px;
 }
 .list-species {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
 }
</style>
