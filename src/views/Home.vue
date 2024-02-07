<template>
  <h1 class="title">Espécies cadastradas</h1>
  <div class="list-species">
    <v-card
      v-for="specie in species"
      :key="specie.id"
      width="30%"
      :title="specie.name"
      link
      @click="handleRedirect(specie.id)"
      data-test="card-item"
    />
  </div>
</template>

<script>
import SpecieService from '../services/SpecieService'

export default {
  data() {
    return {
      species: []
    }
  },
  methods: {
    handleRedirect(id) {
        this.$router.push(`/pets/${id}`);
    }
  },
  mounted() {
    SpecieService.getAllSpecies()
      .then((data) => {
      console.log('data', data)
        this.species = data
      })
      .catch((error) => {
      console.log("............")
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
.item {
  width: 30%;
}
</style>
