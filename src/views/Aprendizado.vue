<template>
  <h1>Minha tarefas</h1>
  <form @submit.prevent="handleAddItem">
    <input placeholder="Digite sua tarefa" v-model="description" />
    <button type="submit">Cadastrar</button>
  </form>
  <hr />
  <ol>
     <li v-for="item in list" :key="item">{{item}}</li>   
  </ol>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      list: []
    }
  },
  methods: {
    handleAddItem() {
      this.list = [...this.list, this.description]
      this.description = ''
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid #000;
  background: #ccc;
  margin: 20px;
}
</style>